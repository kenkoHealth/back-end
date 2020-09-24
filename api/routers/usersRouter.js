const express = require("express");
const Users = require("../models/userModels");
const authmw = require("../auth/authMiddleware");
const router = express.Router();

// Get a list of all users endpoint
router.get("/", async (req, res) => {
  try {
    const users = await Users.findUsers();
    res.status(200).json(users);
  } catch (e) {
    res
      .status(500)
      .json({ error: e.response, message: "Failed to retrieve users." });
  }
});
// Retrieve a user by the user's ID endpoint
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findUserById(id);
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: `Could not find a user with the ID of ${id}.` });
    }
  } catch (e) {
    res.status(500).json({
      message: "Unable to retrieve that user.",
      error: e.response,
    });
  }
});

// Update a user endpoint
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const user = await Users.findUserById(id);
    let first_name = user[0]["first_name"];
    let last_name = user[0]["last_name"];
    const updatedUser = await Users.updateUser(id, changes);
    const userToChange = user[0];
    console.log(userToChange);
    if (
      changes.first_name === userToChange.first_name &&
      changes.last_name === userToChange.last_name &&
      changes.email === userToChange.email &&
      changes.password === userToChange.password
    ) {
      res.status(400).json({
        error: `Update must include at least one change to the user ${first_name} ${last_name}.`,
      });
    } else {
      res.status(200).json({
        user: updatedUser,
        Message: `User profile ${first_name} ${last_name} successfully updated.`,
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.response,
      message: `Failed to update user with the id of ${id}.`,
    });
  }
});

// Delete a user endpoint
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await Users.destroyUser(id);
    if (!deletedUser) {
      res
        .status(404)
        .json({ message: `User with ID of ${id} does not exist.` });
    } else {
      res
        .status(200)
        .json({ message: `Successfully deleted user with the ID of ${id}.` });
    }
  } catch (e) {
    res.status(500).json({
      error: e.response,
      message: `Failed to delete user with the ID of ${id}.`,
    });
  }
});

module.exports = router;
