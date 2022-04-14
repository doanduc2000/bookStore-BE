const express = require('express');
const userRoute = express.Router();
const { register, login } = require('../controllers/user');

userRoute.post('/register', register);
userRoute.post('/login', login);

module.exports = userRoute;
