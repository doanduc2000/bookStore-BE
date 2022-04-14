const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (password, hashPassword) => {
  const match = bcrypt.compareSync(password, hashPassword);
  return match;
};

module.exports = { hashPassword, comparePassword };
