// Bring in JSONWebToken
const jwt = require("jsonwebtoken");
// Dotenv to get secret
require("dotenv").config();

module.exports = (req, res, next) => {
  // Extraction authorization information from cookies
  const cookie = req.cookies;
  // Load the secret from .env
  const secret = process.env.JWT_SECRET;
  // If User has provided authorization information...
  if (cookie) {
    // Verify it either returning an error or a decoded token to store
    jwt.verify(cookie.token, secret, function (error, decodedToken) {
      if (error) {
        res.status(401).json({ Message: "invalid token given" });
      } else {
        req.headers.cookie.token = decodedToken; // so anything downstream can access the data in the token
        next();
      }
    });
    // Otherwise, prompt user to attempt login to try again.
  } else {
    res.status(400).json({ message: "Please login and try again!" });
  }
};
