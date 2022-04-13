require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const initDbConnection = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      logger.info('[BOOKSTORE] Database connect successfully.');
    })
    .catch((err) => {
      logger.error(`Error connecting: ${err.message}`);
    });
};
module.exports = { initDbConnection };
