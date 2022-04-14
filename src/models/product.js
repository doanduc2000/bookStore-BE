const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    image: String,
    category: String,
    quantity: {
      type: Number,
      default: 0,
    },
    publish: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Products', ProductSchema);
