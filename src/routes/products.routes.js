import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        const products = await productDao.getAll();
        res.status(200).json({status: "success", payload: products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.post("/", create);
router.get("/:pid", readOne);
router.put("/:pid", update);
router.delete("/:pid", destroy);

async function readOne(req, res) {
    try {
        const pid = req.params.pid;
        const one = await productDao.getById(pid);
        res.status(200).json({status: "success", payload: one});
    } catch (error) {
        console.log(error);
        return res.status(404).json({ status: 404, response: error.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newProduct = await productDao.create(data);
        res.status(201).json({status: "success", payload: newProduct}); 
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}

async function update(req, res) {
    try {
        const { pid } = req.params;
        const data = req.body;

        const existingProduct = await productDao.getById(pid);

        if (!existingProduct) {
            return res.status(404).json({ status: 404, response: `Producto con ID ${pid} no encontrado` });
        }

        const updatedProduct = await productDao.update(pid, data);
        return res.json({ status: 200, response: updatedProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, response: error.message });
    }
}

async function destroy(req, res) {
    try {
        const { pid } = req.params;
        const one = await productDao.getById(pid);

        if (one) {
            await productDao.deleteOne(pid);
            return res.json({ status: 200, response: one });
        }
        const error = new Error("Not found");
        error.status = 404;
        throw error;
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}

export default router;