const crypto = require('crypto');

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateTokenExpiry = (hours = 1) => {
  return Date.now() + hours * 3600000; // Convert hours to milliseconds
};

module.exports = {
  generateResetToken,
  generateTokenExpiry
};