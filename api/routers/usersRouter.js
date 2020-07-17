const express = require("express");
const Users = require("../models/userModels");
const authmw = require("../auth/authMiddleware");
const router = express.Router();

// Get a list of all users endpoint
router.get("/", authmw, (req, res) => {
  Users.findUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: "Failed to retrieve users." });
    });
});
// Retrieve a user by the user's ID endpoint
router.get("/:id", authmw, (req, res) => {
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
      res.status(500).json({
        error: "Unable to retrieve that user, please pass in a valid ID.",
      });
    });
});

// Update a user endpoint
router.put("/:id", authmw, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findUserById(id)
    .then((user) => {
      let first_name = user[0]["first_name"];
      let last_name = user[0]["last_name"];
      Users.updateUser(id, changes)
        .then((user) => {
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
              Message: `User profile ${first_name} ${last_name} successfully updated.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: `Failed to update user with the id of ${id}.`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to retrieve that user, please pass in a valid user ID.",
      });
    });
});

// Delete a user endpoint
router.delete("/:id", authmw, (req, res) => {
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
