const express = require("express");
const Users = require("../models/userModels");
const authmw = require("../auth/auth-middleware.js");
const router = express.Router();

// Get a list of all users endpoint
router.get("/", (req, res) => {
  Users.findUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Failed to get users" });
    });
});
// Retrieve a user by the user's ID endpoint
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findUserById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find a user with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Failed to get users" });
    });
});

// Update a user endpoint
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findUserById(id)
    .then((user) => {
      if (user) {
        Users.update(changes, id).then((updatedUser) => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: "Could not find user with that ID" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Failed to update User" });
    });
});

// Delete a user endpoint
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.destroyUser(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
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
