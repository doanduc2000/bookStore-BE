const Order = require('../models/order');

const createOrder = async (order) => {
  const newOrder = new Order(order);
  return await newOrder.save();
};
const getOrderById = async (id) => {
  return await Order.findById(id);
};
const updateOrder = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status: status });
};
module.exports = { createOrder, updateOrder, getOrderById };
