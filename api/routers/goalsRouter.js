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
// Retrieve goals by a specific user ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await goals.getGoalByUserId(id);
    if (!id) {
      res
        .status(404)
        .json({ message: `User with ID of ${id} does not exist.` });
    } else {
      res.status(200).json(results);
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: e, message: "Failed to retrieve Goals for that user." });
  }
});
// Get a specific goal from any user by it's ID
router.get("/:id");
module.exports = router;
