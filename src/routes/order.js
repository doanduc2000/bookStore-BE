const express = require('express');
const { createOrder } = require('../controllers/order');
const { requireLogin } = require('../middlewares/auth');
const orderRoute = express.Router();

orderRoute.post('/', requireLogin, createOrder);

module.exports = orderRoute;
