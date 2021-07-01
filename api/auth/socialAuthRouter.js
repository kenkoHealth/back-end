const express = require("express");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { route } = require("./authRouter");
const router = express.Router();
require("dotenv").config();

// Fetch access token with authentication code received by the front-end
router.get("/facebook/token", async (req, res) => {
  // Pull the accessCode out of the request object
  const accessCode = req.code;
  // Make request to Facebook GraphQL endpoint passing all the required data and the code above
  let response = await axios.get(
    `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${process.env.FB_APP_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&client_secret=${process.env.FB_APP_SECRET}&code=${accessCode}`
  );
  // Log response from Facebook
  console.log(response);
  // Should look like...
  //   {
  //     "access_token": {access-token},
  //     "token_type": {type},
  //     "expires_in":  {seconds-til-expiration}
  //   }
});
