// Bring in dependencies here at the top
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const morgan = require("morgan");

// Global middleware here...
server.use(express.json());
server.use(helmet());
// Logging Middleware
server.use(morgan("tiny"));
// Bring in Cors to prevent cross-origin blocking.
server.use(cors());

// Bring in Express Routers here....

// End....

// Base URL for server
server.get("/", (req, res) => {
  res.status(200).json({ Message: "Server is up and running!" });
});
// Export Express server
module.exports = server;
