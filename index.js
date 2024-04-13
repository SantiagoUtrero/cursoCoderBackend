const fs = require("fs")

let products = [];
let pathFile = "./data/products.json"


const addProducts = async (title, description, price, thumbnail, code, stock) => {
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
    
}

const getProducts = async () => {
    const productJson = await fs.promises.readFile(pathFile, 'utf8');
    products = JSON.parse(productJson) || [];
    return products;
}

const getProductById = async (id) => {
    await getProducts();

    const product = products.find(product => product.id === id);
    if (!product){
        throw new Error(`No se encontró el producto con el id ${id}.`);
    }

    console.log(product);
    return product;
}

const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex(product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

const deleteProduct = async (id) =>{
    await getProducts();
    products = products.filter( product => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

//addProducts("Producto 1", "el primer producto", 299, "https://", "AJ912", 100);
//addProducts("Producto 2", "el segundo producto", 455, "https://", "AJ913", 10);
//addProducts("Producto 3", "el tercer producto", 455, "https://", "AJ913", 5);
//addProducts("Producto 4", "el cuarto producto", 905, "https://", "AJ914", 50);
//addProducts("Producto 5", "el quinto producto", 234, "https://", "AJ915", 25);
//addProducts("Producto 6", "el sexto producto", 100, "https://", "AJ916", 12);
//addProducts("Producto 7", "el septimo producto", 600, "https://", "AJ917", 19);

//getProducts();

//getProductById(4);

//updateProduct(3, {
    //title: "Producto 3",
    //description: "el tercer producto",
//});

deleteProduct(2);