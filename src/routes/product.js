const express = require('express');
const productRoute = express.Router();
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

productRoute.get('/', getAllProduct);
productRoute.post('/', createProduct);
productRoute.get('/:id', getProductById);
productRoute.put('/:id', updateProduct);
productRoute.delete('/:id', deleteProduct);

module.exports = productRoute;
