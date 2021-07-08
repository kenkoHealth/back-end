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
    let fbUserId = await axios.get(
      `https://graph.facebook.com/me?fields=id&access_token=${response.data.access_token}`
    );
    const { id } = fbUserId.data;

    // Make request to fetch all the user data
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: error.message });
  }
});

module.exports = router;
