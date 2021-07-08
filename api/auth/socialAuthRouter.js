const express = require("express");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const router = express.Router();
const axios = require("axios");
const faker = require("faker");
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

    let userData = userResponse.data;

    userToAdd = {
      email: userData.email,
      password: faker.internet.password(10),
      username: `${userData.first_name}.${userData.last_name}`,
      first_name: userData.first_name,
      last_name: userData.last_name,
    };
    /* NEED TO ADD A CHECK THAT CHECKS IF THE EMAIL ALREADY EXISTS IN THE DATABASE, IF SO...DO NOT ADD THE USER TO DB, JUST RETURN THE USER AS JSON */
    /* CAN PROBABLY BUNDLE ALL THIS INTO A FUNCTION AS WE'LL NEED TO REPEAT THIS FUNCTIONALITY FOR OTHER SOCIAL MEDIA AUTH SERVICES */
    if (userToAdd.password) {
      const hash = bcrypt.hashSync(userToAdd.password, 12);
      userToAdd.password = hash;
    }

    if (userToAdd.email && userToAdd.password && userToAdd.username) {
      let addedUser = await Users.addUser(userToAdd);
      res
        .status(201)
        .json({ user: addedUser, message: "User successfully created!" });
    } else {
      res
        .status(500)
        .json({ message: "Please make sure all required fields are present!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: error.message });
  }
});

module.exports = router;
