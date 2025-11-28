const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // user: mongoose user document or object with _id and role
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = generateToken;
