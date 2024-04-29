import fs from "fs";
import crypto from "crypto"

const carts = []
const pathFile = "./data/carts.json"


const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile);
    carts = JSON.parse(cartsJson) || []
    return carts
}

const createCart = async () =>{
    getCarts();

    const newCart = {
        id: crypto.randomBytes(5).toString("hex"),
        products: []
    };

    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return newCart;
}

const getCartById = async (cid) =>{
    await getCarts();

    const cart = carts.find(c => c.id === cid);

    if(!cart) return `no se encontro el carrito ${cid}`

    return cart.products;
}

const addProductToCart = async (cid, pid) =>{
    await getProducts()
    const index = carts.findIndex(c => c.id === cid)
    if (index === -1) return `no se encontro el carrito ${cid}`
    
    carts[index].products.push({
        product: pid,
        quantity: 1
    })

    return carts[index];
}

export default{
    getCarts,
    createCart,
    getCartById,
    addProductToCart
}