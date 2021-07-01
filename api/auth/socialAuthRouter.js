const express = require("express");
const Users = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { route } = require("./authRouter");
const router = express.Router();
require("dotenv").config();

// Fetch access token with authentication code received by the front-end
router.get("https://graph.facebook.com/v11.0/oauth/access_token?");
