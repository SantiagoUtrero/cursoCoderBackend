import fs from "fs";
import crypto from "crypto";


let products = [];
let pathFile = "./data/products.json"

const productFunctions = {

    async addProducts(data) {
        const { title, description, price, thumbnail, code, stock } = data;
    
        console.log("Data received:", data);
    
        if (!title || !code) {
            console.log(`Los campos 'title' y 'code' son obligatorios para agregar un producto.`);
            return;
        }
    
        try {
            const productsJson = await fs.promises.readFile(pathFile, 'utf8');
            let products = JSON.parse(productsJson) || [];
    
            const productExistence = products.find(product => product.code === code);
            if (productExistence) {
                console.log(`El producto "${title}" con el código ${code} ya existe.`);
                return;
            }
    
            const newProduct = {
                id: crypto.randomBytes(5).toString("hex"),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
    
            products.push(newProduct);
    
            await fs.promises.writeFile(pathFile, JSON.stringify(products));
    
            console.log("Producto creado:", newProduct);
            
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    },
    
    async getProducts() {

        const productJson = await fs.promises.readFile(pathFile, 'utf8');
        products = JSON.parse(productJson) || [];
        console.log(products);
        return products;
    },

    async getProductById(id) {

        await this.getProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            throw new Error(`No se encontró el producto con el id ${id}.`);
        }
        console.log(product);
        return product;
        
    },

    async updateProduct(id, dataProduct) {
        try {
            const allProducts = await this.getProducts();
            const index = allProducts.findIndex(product => product.id === id);

    
            allProducts[index] = {
                ...allProducts[index],
                ...dataProduct
            };
    
            await fs.promises.writeFile(pathFile, JSON.stringify(allProducts));
    
            return allProducts[index];
        } catch (error) {
            throw error;
        }
    },

    async deleteProduct(id) {

        await this.getProducts();
        products = products.filter( product => product.id !== id);
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
    }
};

export default productFunctions;


