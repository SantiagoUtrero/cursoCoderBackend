import express from "express"
import routes from "./routes/index.js"
import handlebars from "express-handlebars";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";

//conexion con la base de datos
connectMongoDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:123junio@e-commerce1.hwuxqrg.mongodb.net/ecommerce",
        ttl: 15
    }),
    secret: "CodigoSecreto",
    resave: true

}))


//handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/api", routes)

const port = 8080
const ready = console.log(`server ready on port ${port}`);

app.listen(port, ready)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get("/api", (req, res) => {
    try {
        const message = "Welcome to my server"
        return res.json({ status: 200, response: message })
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
})

