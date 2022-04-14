const express = require('express');
const indexRoute = express.Router();
const userRoute = require('./user');

indexRoute.use('/users', userRoute);

module.exports = indexRoute;
