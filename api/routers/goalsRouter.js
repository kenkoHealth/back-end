const express = require("express");
const goals = require("../models/goalModels");
const router = express.Router();
const authmw = require("../auth/authMiddleware");
const asyncMiddleware = require("../utils/asyncMiddleware");

// Endpoint to retrieve all goals
router.get("/", async (req, res) => {
  try {
    const results = await goals.getGoals();
    res.status(200).json(results);
  } catch (e) {
    res
      .status(500)
      .json({ error: e.response, message: "Failed to retrieve Goals." });
  }
});
// Retrieve goals by a specific user ID
router.get("/:id", async (req, res) => {
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
    res.status(500).json({
      error: e.response,
      message: "Failed to retrieve Goals for that user.",
    });
  }
});
// Get a specific goal from any user by it's ID
router.get("/goal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await goals.getGoalById(id);
    if (!id) {
      res
        .status(404)
        .json({ message: `Goal with ID of ${id} does not exist.` });
    } else res.status(200).json(result);
  } catch (e) {
    res.status(500).json({
      error: e.response,
      message: `Failed to retrieve Goal with ID of ${id}.`,
    });
  }
});
// Add a goal for a specific user
router.post("/", async (req, res) => {
  const newGoal = req.body;
  try {
    const result = await goals.addGoal(newGoal);
    // Loop over newGoal object, if any of the values are falsy, throw a bad request error
    for (let [key, value] of Object.entries(newGoal)) {
      if (!value) {
        res.status(400).json({
          message: `Please make sure all required fields are populated before sending request.`,
        });
      } else res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json({ error: e.response, message: `Unable to add Goal.` });
  }
});
// Delete a goal
router.delete("/", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await goals.deleteGoal(id);
    if (!id) {
      res
        .status(404)
        .json({ message: `Goal with ID of ${id} does not exist.` });
    } else
      res.status(200).json({
        data: result,
        message: `Successfully deleted goal with ID of ${id}.`,
      });
  } catch (e) {
    res.status(500).json({
      error: e.response,
      message: `Unable to delete user with the ID of ${id}.`,
    });
  }
});
module.exports = router;
