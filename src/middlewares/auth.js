const httpResponses = require('../utils/httpResponses');
const logger = require('../utils/logger');
const { verifyToken } = require('../services/auth');

const requireLogin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const user = verifyToken(token);
      req.session.user = user;
    } else {
      return res.status(httpResponses.HTTP_STATUS_UNAUTHORIZED).json({ message: `${httpResponses.UNAUTHORIZED}` });
    }
    next();
  } catch (error) {
    logger.error(`RequireLogin: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
module.exports = { requireLogin };
