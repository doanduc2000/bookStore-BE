const productService = require('../services/product');
const httpResponses = require('../utils/httpResponses');
const logger = require('../utils/logger');

const createProduct = async (req, res) => {
  try {
    const { code, name, price, image, category, quantity, publish } = req.body;
    logger.info(`createProduct: ${code}, ${name}, ${price}, ${image}, ${category}, ${quantity}, ${publish}`);
    const existProduct = await productService.getProductByCode(code);
    if (existProduct) {
      logger.error(`register: ${httpResponses.ALREADY_EXISTS_PRODUCT}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.ALREADY_EXISTS_PRODUCT}`,
        success: false,
      });
    }
    const product = {
      code: code,
      name: name,
      price: price,
      image: image,
      category: category,
      quantity: quantity,
      publish: publish,
    };
    const newProduct = await productService.createProduct(product);
    logger.info(`createProduct: ${httpResponses.PRODUCT_CREATED}`);
    return res.status(httpResponses.HTTP_STATUS_CREATED).json({
      success: true,
      message: `${httpResponses.PRODUCT_CREATED}`,

      data: newProduct,
    });
  } catch (error) {
    logger.error(`register: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { _limit, _page, _sort } = req.query;
    const filter = {
      limit: _limit,
      page: _page,
      sort: _sort,
    };
    const getAllProduct = await productService.getProduct(filter);
    logger.info(`getAllProduct: ${httpResponses.SUCCESSFUL}`);
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESSFUL}`,
      data: getAllProduct,
    });
  } catch (error) {
    logger.error(`getAllProduct: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await productService.getProductById(id);
    if (!getProduct) {
      logger.error(`getProductById: ${httpResponses.PRODUCT_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.PRODUCT_NOT_FOUND}`,
        success: false,
      });
    }
    logger.info(`getProductById: ${httpResponses.SUCCESSFUL}`);
    return res.status(httpResponses.HTTP_STATUS_OK).json({
      success: true,
      message: `${httpResponses.SUCCESSFUL}`,
      data: getProduct,
    });
  } catch (error) {
    logger.error(`getProductById: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, category, quantity, publish } = req.body;
    logger.info(`updateProduct: ${name}, ${price}, ${image}, ${category}, ${quantity}, ${publish}`);

    const getProduct = await productService.getProductById(id);
    if (!getProduct) {
      logger.error(`updateProduct: ${httpResponses.PRODUCT_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.PRODUCT_NOT_FOUND}`,
        success: false,
      });
    }
    const product = {
      name: name,
      price: price,
      image: image,
      category: category,
      quantity: quantity,
      publish: publish,
    };
    const updateProduct = await productService.updateProduct(id, product);
    const responseProduct = await productService.getProductById(updateProduct._id);
    if (!responseProduct) {
      logger.error(`updateProduct: ${httpResponses.PRODUCT_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.PRODUCT_NOT_FOUND}`,
        success: false,
      });
    }
    logger.info(`updateProduct: ${httpResponses.PRODUCT_UPDATED}`);
    return res.status(httpResponses.HTTP_STATUS_CREATED).json({
      success: true,
      message: `${httpResponses.PRODUCT_UPDATED}`,
      data: responseProduct,
    });
  } catch (error) {
    logger.error(`updateProduct: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await productService.getProductById(id);
    if (!getProduct) {
      logger.error(`deleteProduct: ${httpResponses.PRODUCT_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.PRODUCT_NOT_FOUND}`,
        success: false,
      });
    }
    await productService.deleteProduct(id);
    logger.info(`deleteProduct: ${httpResponses.SUCCESSFUL}`);
    return res.status(httpResponses.HTTP_STATUS_CREATED).json({
      success: true,
      message: `${httpResponses.SUCCESSFUL}`,
    });
  } catch (error) {
    logger.error(`deleteProduct: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const getProductByCategory = async (req, res) => {
  try {
    const category = req.query;
  } catch (error) {}
};

module.exports = { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct, getProductByCategory };
