const jwt = require("jsonwebtoken");
require('dotenv').config()
  

const authMiddleware = (req) => {
  const cookieArray = req?.headers?.cookie?.split("; ");
  const tokenCookie = cookieArray.find((cookie) => cookie.startsWith("jwt"));
  // const token = req?.headers?.cookie?.split("=")[1];
  const token = tokenCookie?.split("=")[1];
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decodedToken);
    
    return decodedToken;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = authMiddleware;
