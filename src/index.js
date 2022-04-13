require('dotenv').config();
const logger = require('./utils/logger');
const http = require('http');
const app = require('./app');
const server = http.Server(app);

server.listen(process.env.SERVER_PORT, (error) => {
    if (error) {
        logger.error(`error:${error}`);
        process.exit(1);
    }
    logger.info(`[BOOKSTORE] Server is listening on port:${process.env.SERVER_PORT}`)
})