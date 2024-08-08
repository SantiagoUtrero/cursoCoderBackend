import cartsRepository from "../persistences/repositories/carts.repository.js";

const createCart = async (req,res) => {
   return await cartsRepository.create();
}
const addProductToCart = async (cid, pid) => {

 const cart = await cartsRepository.addProductToCart(cid, pid);
 return cart;
    
}
const getById = async (id) => {
    return await cartsRepository.getById(id)
}

const deleteProductInCart = async (cid, pid) => {
    return await cartsRepository.deleteProductInCart(cid, pid);
}

export default {
    createCart,
    addProductToCart,
    getById,
    deleteProductInCart
}