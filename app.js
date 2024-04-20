import express, { response } from "express"
import productFunctions from "./files/products.js"

const app = express()

const port = 8080
const ready = console.log(`server ready on port ${port}`);

app.listen(port,ready)

app.use(express.urlencoded({extended:true}))

//solicitudes

app.get("/", (req, res)=>{
    try {
        const message = "Welcome to my server"
        return res.json({ status: 200, response: message })
    } catch (error){
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
})

app.get("/products", read)
app.get("/products/:pid", readOne)

async function read(req,res) {

    try {
        const all = await productFunctions.getProducts();
        return res.json({ status: 200, response: all})
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message})
    }
}

async function readOne(req, res) {

    try {
        const pid = parseInt(req.params.pid);
        const one = await productFunctions.getProductById(pid);
        return res.json({ status: 200, response: one });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}