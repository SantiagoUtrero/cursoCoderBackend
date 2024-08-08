import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import createHash, { isValidPassword } from "../utils/hasPassword.js";
import envs from "./env.config.js";
import userRepository from "../persistences/repositories/user.repository.js";

const localStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies){
    token = req.cookies.token
  }

  return token
}


const initializePassport =  () => {
  passport.use(
    "register",
    new localStrategy({ passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, role } = req.body;
  
          // Verificar si el usuario ya existe por correo electrónico
          const user = await userRepository.getByEmail(email); 
          if (user) return done(null, false, { message: "El usuario ya existe" });
  
          // Crear un nuevo usuario si no existe
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
          };
  
          const createdUser = await userRepository.create(newUser);
          return done(null, createdUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


    passport.use(
      "login",
      new localStrategy({usernameField: "email"}, async (username, password, done) => {
        try {
          const user = await userRepository.getByEmail(username)
          if(!user || !isValidPassword(user, password)) return done(null, false, {message: "invalid email or password"});

          return done(null, user);

        } catch (error) {
          done(error)
        }
      })
    )

    passport.use(
        "google",
        new GoogleStrategy({
          clientID: envs.GOOGLE_CLIENT,
          clientSecret: envs.GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:8080/api/sessions/google",
        },
        async (accesToken, refreshToken, profile, cb) =>{
          try {
            
            const {name, emails} = profile;
            const user = {
              first_name: name.givenName,
              last_name: name.familyName,
              email: emails[0].value
            };
            const existUser = await userRepository.getByEmail(emails[0].value)
            if (existUser) return cb(null, existUser);

            const newUser = await userRepository.create(user)
            cb(null, newUser);

          } catch (error) {
            return cb (error)
          }
        }
      )
    )
  passport.use ("jwt", new JWTStrategy (
    { 
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: envs.CODE_SECRET,
  },
  async (jwt_payload, done) =>{
    try {

      return done(null, jwt_payload);

    } catch (error) {
      return done (error)
    }
  }
))
         passport.serializeUser((user, done) => {
          done(null, user._id)
         })

         passport.deserializeUser(async(id, done) =>{
          const user = await userRepository.getById(id);
          done(null, user);
         })
};

export default initializePassport;