const pool = require('../config/db');
const { generateResetToken, generateTokenExpiry } = require('../utils/tokenGenerator');

const authService = {
  async findUserByEmail(email) {
    //const [users] = await pool.query('SELECT * FROM users WHERE email = "bipin79it@gmail.com"', [email]);
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return users[0];
  },

  async updateResetToken(userId, token, expiry) {
    await pool.query(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      [token, new Date(expiry), userId]
    );
  },

  async validateResetToken(userId, token) {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND reset_token = ? AND reset_token_expiry > ?',
      [userId, token, new Date()]
    );
    return users[0];
  },

  async updatePassword(userId, hashedPassword) {
    await pool.query(
      'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
      [hashedPassword, userId]
    );
  }
};

module.exports = authService;