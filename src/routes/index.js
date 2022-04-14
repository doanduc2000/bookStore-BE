const express = require('express');
const indexRoute = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');

indexRoute.use('/users', userRoute);
indexRoute.use('/products', productRoute);

module.exports = indexRoute;
