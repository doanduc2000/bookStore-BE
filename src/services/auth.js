const jwt = require('jsonwebtoken');
const key = require('../constants/key');
const constant = require('../constants/constant');

const generateToken = (payload) => {
  const token = jwt.sign(payload, key.SECRET_KEY, { expiresIn: constant.EXPIRES_IN });
  return `Bearer ${token}`;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, key.SECRET_KEY);
  return payload;
};

module.exports = { generateToken, verifyToken };
