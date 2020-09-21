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
    if (user.length > 0) {
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
      message: `Failed to update user with the id of ${id}.`,
    });
  }
});

// Delete a user endpoint
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.destroyUser(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200);
        res.json({
          Message: `You have successfully removed the user with the id ${id}`,
        });
      } else {
        res.status(404).json({
          message: "Could not find and delete User with the given ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Failed to delete User" });
    });
});

module.exports = router;
