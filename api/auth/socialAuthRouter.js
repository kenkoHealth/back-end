const express = require("express");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/facebook/token", async (req, res) => {
  const accessCode = req.body.code;
  try {
    let response = await axios.get(
      `https://graph.facebook.com/v11.0/oauth/access_token?client_id=${process.env.FB_APP_ID}&redirect_uri=${process.env.FB_REDIRECT_URI}&client_secret=${process.env.FB_APP_SECRET}&code=${accessCode}`
    );
    let fbUserId = await axios.get(
      `https://graph.facebook.com/me?fields=id&access_token=${response.data.access_token}`
    );
    const { id } = fbUserId.data;

    let userResponse = await axios.get(
      `https://graph.facebook.com/v11.0/${id}?fields=email,first_name,last_name,picture,id&access_token=${response.data.access_token}`
    );
    console.log(userResponse, "userData");
    // Use the userData that comes from FB to create a user in our database
    /* Make sure to check if the user already exists in the database, if it does....simply fetch and return. 
    Otherwise, generate a new user and return */
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: error.message });
  }
});

module.exports = router;
