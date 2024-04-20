import fs from "fs";


let products = [];
let pathFile = "./data/products.json"

const productFunctions = {

    async addProducts(title, description, price, thumbnail, code, stock) {

        const newProduct={
            id: products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
    
        if (!title || !code) {
            console.log(`Los campos 'title' y 'code' son obligatorios para agregar un producto.`);
            return;
        }
    
        const productsExistence = products.find(product => product.code === code);
    
        if(productsExistence){
            console.log(`El producto "${title}" con el código ${code} ya existe.`);
            return;
        }
    
        products.push(newProduct);
    
        await fs.promises.writeFile(pathFile, JSON.stringify(products))
    },
    
    async getProducts() {

        const productJson = await fs.promises.readFile(pathFile, 'utf8');
        products = JSON.parse(productJson) || [];
        console.log(products);
        return products;
    },

    async getProductById(id) {

        await this.getProducts();
        const product = products.find(product => product.id.toString() === id.toString());
        if (!product){
            throw new Error(`No se encontró el producto con el id ${id}.`);
        }
        console.log(product);
        return product;
        
        },

    async updateProduct(id, dataProduct) {
        
    await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    },

    async deleteProduct(id) {

        await this.getProducts();
        products = products.filter( product => product.id !== id);
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
    }
};

export default productFunctions;


//productFunctions.updateProduct(1)

