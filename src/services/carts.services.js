import cartsRepository from "../persistences/repositories/carts.repository.js";
import productsRepository from "../persistences/repositories/products.repository.js";

const createCart = async (req,res) => {
   return await cartsRepository.create();
}
const addProductToCart = async (cid, pid) => {

    const product = await productsRepository.getById(pid);
    return await cartsRepository.addProductToCart(cid, pid);
    
}
const getById = async (id) => {
    return await cartsRepository.getById(id)
}

const deleteProductInCart = async (cid, pid) => {
    return await cartsRepository.deleteProductInCart(cid, pid);
}

const purchaseCart = async (cid) => {
    // Obtén el carrito por ID y verifica que no sea null
    const cart = await cartsRepository.getById(cid);
    if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
    }

    let total = 0;
    const products = [];
    for (const product of cart.products) {
        const prod = await productsRepository.getById(product.product);
        if (!prod) {
            console.error(`Producto con id ${product.product} no encontrado`);
            products.push(product);
            continue;
        }
        if (prod.stock >= product.quantity) {
            total += prod.price * product.quantity;
        } else {
            products.push(product);
        }
    }
    await cartsRepository.updateCart(cid, products);

    return total;
};

export default {
    createCart,
    addProductToCart,
    getById,
    deleteProductInCart,
    purchaseCart
}