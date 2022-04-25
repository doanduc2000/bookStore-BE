const httpResponses = require('../utils/httpResponses');
const logger = require('../utils/logger');
const orderService = require('../services/order');
const productService = require('../services/product');
const userService = require('../services/user');

const createOrder = async (req, res) => {
  try {
    const orderInfo = req.body;
    const user = req.session.user;
    orderInfo.forEach((e) => {
      logger.info(`createOrder: ${e.quantity},${e.cost},${e.productId},${user._id}`);
    });
    const existedUser = await userService.getUserById(user._id);
    if (!existedUser) {
      logger.error(`createOrder: ${httpResponses.USER_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.USER_NOT_FOUND}`,
        success: false,
      });
    }

    // const existedProduct = await productService.getProductById(productId);
    // if (!existedProduct) {
    //   logger.error(`createOrder: ${httpResponses.PRODUCT_NOT_FOUND}`);
    //   return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
    //     message: `${httpResponses.PRODUCT_NOT_FOUND}`,
    //     success: false,
    //   });
    // }
    // const payment = quantity * cost;
    // const order = {
    //   userId: existedUser._id,
    //   productId: existedProduct._id,
    //   quantity: quantity,
    //   payment: payment,
    // };
    // const newOrder = await orderService.createOrder(order);
    // logger.info(`createOrder: ${httpResponses.ORDER_CREATED}`);
    // return res.status(httpResponses.HTTP_STATUS_CREATED).json({
    //   success: true,
    //   message: `${httpResponses.ORDER_CREATED}`,
    //   data: newOrder,
    // });
  } catch (error) {
    logger.error(`createOrder: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
module.exports = { createOrder };
