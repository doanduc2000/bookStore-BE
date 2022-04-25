const userService = require('../services/user');
const { UserRoles } = require('../constants/userRole');
const httpResponses = require('../utils/httpResponses');
const security = require('../services/security');
const { generateToken } = require('../services/auth');
const logger = require('../utils/logger');

const register = async (req, res) => {
  try {
    const { email, password, name, birthday, phoneNumber, gender } = req.body;
    logger.info(`register: ${email}, ${password}, ${name}, ${phoneNumber}, ${birthday}, ${gender}`);
    const existedUser = await userService.getUserByEmail(email);
    if (existedUser) {
      logger.error(`register: ${httpResponses.ALREADY_EXISTS_EMAIL}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        message: `${httpResponses.ALREADY_EXISTS_EMAIL}`,
        success: false,
      });
    }
    const hashPassword = await security.hashPassword(password);
    const newUser = {
      email: email,
      password: hashPassword,
      name: name,
      phoneNumber: phoneNumber,
      birthday: birthday,
      gender: gender,
      role: UserRoles.MEMBER,
    };
    const createUser = await userService.createUser(newUser);
    logger.info(`register: ${httpResponses.USER_CREATED}`);
    return res.status(httpResponses.HTTP_STATUS_CREATED).json({
      success: true,
      message: `${httpResponses.USER_CREATED}`,
      data: createUser,
    });
  } catch (error) {
    logger.error(`register: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`login: ${email}, ${password}`);

    const existedUser = await userService.getUserByEmail(email);
    if (!existedUser) {
      logger.error(`login: ${httpResponses.USER_NOT_FOUND}`);
      return res.status(httpResponses.HTTP_STATUS_NOT_FOUND).json({
        message: `${httpResponses.USER_NOT_FOUND}`,
        success: false,
      });
    }
    const isMatch = security.comparePassword(password, existedUser.password);
    console.log(existedUser.password);
    if (!isMatch) {
      logger.error(`login: ${httpResponses.ERROR_PASSWORD_INCORRECT}`);
      return res.status(httpResponses.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: `${httpResponses.ERROR_PASSWORD_INCORRECT}`,
      });
    }
    const token = generateToken({
      _id: existedUser._id,
      email: existedUser.email,
      name: existedUser.name,
      role: existedUser.role,
    });
    logger.info(`login: ${httpResponses.SUCCESSFUL}`);
    return res.status(httpResponses.HTTP_STATUS_CREATED).json({
      success: true,
      message: `${httpResponses.SUCCESSFUL}`,
      data: {
        user: existedUser,
        token: token,
      },
    });
  } catch (error) {
    logger.error(`login: ${error.message}`);
    return res
      .status(httpResponses.HTTP_STATUS_INTERNAL_ERROR)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

module.exports = { register, login };
