const express = require('express');
const productRoute = express.Router();
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');
const { requireLogin } = require('../middlewares/auth');

productRoute.get('/', getAllProduct);
productRoute.post('/', requireLogin, createProduct);
productRoute.get('/:id', getProductById);
productRoute.put('/:id', requireLogin, updateProduct);
productRoute.delete('/:id', requireLogin, deleteProduct);

module.exports = productRoute;
