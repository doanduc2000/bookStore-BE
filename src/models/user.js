const mongoose = require('mongoose');
const { UserRoles } = require('../constants/userRole');
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    birthday: String,
    gender: String,
    address: String,
    role: {
      type: String,
      enum: UserRoles,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Users', UserSchema);
