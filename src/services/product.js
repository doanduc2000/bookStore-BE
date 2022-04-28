const Product = require('../models/product');
const getProductById = async (id) => {
  return await Product.findById(id);
};
const getProductByCode = async (code) => {
  return await Product.findOne({ code: code });
};
const getProduct = async (filter) => {
  return await Product.find()
    .skip(filter.page * filter.limit)
    .limit(filter.limit)
    .sort(filter.sort);
};
const createProduct = async (product) => {
  const newProduct = new Product(product);
  return await newProduct.save();
};
const updateProduct = async (id, product) => {
  return await Product.findByIdAndUpdate(id, product);
};
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
module.exports = { deleteProduct, getProductById, getProduct, createProduct, getProductByCode, updateProduct };
