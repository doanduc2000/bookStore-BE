const express = require('express');
const indexRoute = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');
const orderRoute = require('./order');

indexRoute.use('/users', userRoute);
indexRoute.use('/products', productRoute);
indexRoute.use('/orders', orderRoute);

module.exports = indexRoute;
