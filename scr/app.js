import express from "express"
import routes from "./routes/index.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes)

const port = 8080
const ready = console.log(`server ready on port ${port}`);

app.listen(port, ready)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//solicitudes

app.get("/api", (req, res) => {
    try {
        const message = "Welcome to my server"
        return res.json({ status: 200, response: message })
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
})

