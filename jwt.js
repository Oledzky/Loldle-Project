const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "dfdf678c4be9a40ecfb88aa15e979e7b548384233e07d08142826ff39f678b43";

function generateToken(user) {
  const payload = {
    user: user,
  };

  const options = { expiresIn: "24h" };

  return jwt.sign(payload, JWT_SECRET, options);
}

function authenticateToken(token) {
  if (token === null) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.user;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  authenticateToken,
};
