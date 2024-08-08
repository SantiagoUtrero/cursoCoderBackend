import productsRepository from "../persistences/repositories/products.repository.js"


const getAll = async (query, options) => {
  const products = await productsRepository.getAll(query, options);
  return products;
}


const getById = async (id) => {
  const product = await productsRepository.getById(id);
  return product;
}


const create = async (data) => {
  const product = await productsRepository.create(data);
  return product;
}


const update = async (id, data) => {
    const product = await productsRepository.update(id, data);
    return product;
}


const deleteOne = async (id) => {
    const products = await productsRepository.deleteOne(id);
    return products;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}