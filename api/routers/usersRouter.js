// User routers here....
const express = require("express");
const Users = require("../models/userModels");

const router = express.Router();

routerHeight.get("/", (req, res) => {
  Users.findUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get users" });
    });
});
