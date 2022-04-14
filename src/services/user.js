const User = require('../models/user');

const getUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};
const getUserById = async (id) => {
  return await User.findById(id);
};
const getUser = async (filter) => {
  return await User.find(filter);
};
const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};
module.exports = {
  getUserByEmail,
  getUserById,
  getUser,
  createUser,
};
