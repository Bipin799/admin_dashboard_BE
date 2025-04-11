const authService = require('../services/authService');
const transporter = require('../config/email');
const { generateResetToken, generateTokenExpiry } = require('../utils/tokenGenerator');
const crypto = require('crypto');

const authController = {
  async forgotPassword(req, res) {
    const { email } = req.body;
    
    try {
      // Check if user exists
      const user = await authService.findUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
      
      // Generate reset token and expiry
      const resetToken = generateResetToken();
      const resetTokenExpiry = generateTokenExpiry();
      
      // Store token in database
      await authService.updateResetToken(user.id, resetToken, resetTokenExpiry);
      
      // Create reset URL
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user.id}`;
      
      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset for your account.</p>
          <p>Click this link to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      };
      
      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Error processing your request' });
    }
  },

  async resetPassword(req, res) {
    const { userId, token, newPassword } = req.body;
    
    try {
      // Check if token is valid and not expired
      const user = await authService.validateResetToken(userId, token);
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      
      // Hash the new password (use bcrypt in production)
      const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
      
      // Update password and clear reset token
      await authService.updatePassword(user.id, hashedPassword);
      
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  }
};

module.exports = authController;