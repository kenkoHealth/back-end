const express = require("express");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Fetch access token with authentication code received by the front-end
router.post("/facebook/token", async (req, res) => {
  const accessCode = req.body.code;
  // Make request to Facebook GraphQL endpoint passing all the required data and the code above
  try {
    let response = await axios.get(
      `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${process.env.FB_APP_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&client_secret=${process.env.FB_APP_SECRET}&code=${accessCode}`
    );
    // Log response from Facebook
    console.log(response);
    /* Need to figure out what to do next here...
    We can either handle the accessToken in the server make request to fetch user data and generate an account based on that */

    /* OR we can pass the token back to the front-end where they can use it to make requests to fetch user data to persist to the client */

    // Now I'm thinking I should get the user data, build a user and add to database, and then return that user data for the FE to persist,
    // It's just safer to handle it all on the server and only pass the client what it absolutely needs
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: error.message });
  }
});

module.exports = router;
