const express = require("express");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// Register a user endpoint
router.post("/register", (req, res) => {
  const user = req.body;
  // Hash user's password with bcryptjs
  const hash = bcrypt.hashSync(user.password, 12);
  // Assign user's password to hashed pw
  user.password = hash;
  Users.addUser(user)
    .then((savedUser) => {
      // Return successful request and pass user info back to client.
      res.status(201).json({ message: `Successfully registered!` });
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Unable to add User" });
    });
});

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findBy(email)
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // Generate token on login as well as register
        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
          Message: `Welcome ${user.first_name} ${user.last_name}!`,
          Status: "Logged in",
          token: token,
          current_user: { ...user, password: null },
        });
      } else {
        res.status(401).json({ message: "Invalid credentials provided!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, message: "Login Failed!" });
    });
});

// ** GENERATE JWT TOKEN FUNCTION **
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.email,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "12h",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
