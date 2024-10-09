import productsServices from "../services/products.services.js";

productsServices

const getAll = async (req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort == "asc" ? 1 : -1,
            },
            lean: true
        };

    
        if(status) {
            const products = await productsServices.getAll({status: status});
            res.status(200).json({products});
        }
        
        if(category) {
            const products = await productsServices.getAll({category: category});
            res.status(200).json({products});
        }

        
        const products = await productsServices.getAll({}, options);
        res.status(200).json({status: "success", payload: products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: error.message });
    }
}

const readOne = async (req, res, next) => {
    try {
        const pid = req.params.pid;
        const one = await productsServices.getById(pid);
        res.status(200).json({status: "success", payload: one});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const create = async (req, res) => {
    try {
        const data = req.body;
        const newProduct = await productsServices.create(data);
        res.status(201).json({status: "success", payload: newProduct}); 
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { pid } = req.params;
        const data = req.body;

        const existingProduct = await productsServices.getById(pid);

        if (!existingProduct) {
            return res.status(404).json({ status: 404, response: `Producto con ID ${pid} no encontrado` });
        }

        const updatedProduct = await productsServices.update(pid, data);
        return res.json({ status: 200, response: updatedProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, response: error.message });
    }
}

const destroy = async (req, res) => {
    try {
        const { pid } = req.params;
        const one = await productsServices.getById(pid);

        if (one) {
            await productsServices.deleteOne(pid);
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

export default {
    getAll,
    readOne,
    create,
    update,
    destroy
}