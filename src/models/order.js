const mongoose = require('mongoose');
const { OrderStatus } = require('../constants/userRole');

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prouducts',
    },
    payment: String,
    quantity: String,
    status: {
      type: String,
      enum: OrderStatus.PENDING,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model('Orders', orderSchema);
