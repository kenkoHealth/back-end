const express = require("express");
const goals = require("../models/goalModels");
const router = express.Router();
const authmw = require("../auth/authMiddleware");

// Endpoint to retrieve all goals
router.get("/", async (req, res) => {
  try {
    const results = await goals.getGoals();
    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: e, message: "Failed to retrieve Goals." });
  }
});

module.exports = router;
