import { Router } from "express";
import productFunctions from "../files/products.js"

const router = Router();

router.post("/", create)
router.get("/", read)
router.get("/:pid", readOne)
router.put("/:pid", update);
router.delete("/:pid", destroy)

async function read(req, res) {

    try {
        const all = await productFunctions.getProducts();
        return res.json({ status: 200, response: all })
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
}

async function readOne(req, res) {
    try {
        const pid = req.params.pid;
        const one = await productFunctions.getProductById(pid);
        return res.json({ status: 200, response: one });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ status: 404, response: error.message });
    }
}


async function create(req, res) {
   try {
    const data = req.body
    const one = await productFunctions.addProducts(data)
    return res.json({ status: 201, response: one})
   } catch (error) {
    console.log(error);
        return res.json({ status: 500, response: error.message });
   }
}

async function update(req, res) {
    try {
        const { pid } = req.params;
        const data = req.body;

        const existingProduct = await productFunctions.getProductById(pid);
        if (!existingProduct) {
            return res.status(404).json({ status: 404, response: `Producto con ID ${pid} no encontrado` });
        }

        const updatedProduct = await productFunctions.updateProduct(pid, data);

        return res.json({ status: 200, response: updatedProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, response: error.message });
    }
}

async function destroy (req, res){
    try {
        const { pid } = req.params
        const one = await productFunctions.getProductById(pid)

        if (one){
            await productFunctions.deleteProduct(pid)
            return res.json({status: 200, response: one})
        }
        const error = new Error("Not found")
        error.status = 404
        throw error

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
}

export default router;