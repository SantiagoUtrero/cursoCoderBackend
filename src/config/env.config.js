import dotenv from 'dotenv';


const environment = "PRODUCTION"
dotenv.config({
    path: environment === "PRODUCTION" ? "./.env.prod" : "./.env.dev"
});



export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CODE_SECRET: process.env.CODE_SECRET,
    GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};