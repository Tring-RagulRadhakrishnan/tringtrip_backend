const jwt = require("jsonwebtoken");
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = (req) => {
  const token = req?.headers?.cookie?.split("=")[1];
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = authMiddleware;
