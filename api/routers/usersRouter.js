const express = require("express");
const Users = require("../models/userModels");
const authmw = require("../auth/authMiddleware");
const router = express.Router();

// Get a list of all users endpoint
router.get("/", (req, res) => {
  Users.findUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: "Failed to retrieve users." });
    });
});
// Retrieve a user by the user's ID endpoint
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findUserById(id)
    .then((user) => {
      if (user.length > 0) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: `Could not find a user with the ID of ${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Failed to get user." });
    });
});

// Update a user endpoint
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  console.log(changes);

  Users.updateUser(id, changes)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        message: `Failure to update user with the id of ${id}`,
      });
    });
});

// Delete a user endpoint
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.destroyUser(id)
    .then((deleted) => {
      if (deleted) {
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
