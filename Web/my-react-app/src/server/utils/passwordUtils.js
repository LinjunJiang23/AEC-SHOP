// src/server/utils/passwordUtils.js
const bcrypt = require('bcryptjs');


exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Utility function to compare passwords
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};