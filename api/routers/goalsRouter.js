const express = require("express");
const goals = require("../models/goalModels");
const authmw = require("../auth/authMiddleware");
const router = express.Router();

// Endpoint to retrieve all goals
