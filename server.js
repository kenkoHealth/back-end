// Bring in dependencies here at the top
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const csrfProtect = csrf({
  cookie: true,
});

// Bring in routers
const UsersRouter = require("./api/routers/usersRouter.js");
const AuthRouter = require("./api/auth/authRouter.js");
const goalsRouter = require("./api/routers/goalsRouter.js");

// Global middleware here...
server.use(cookieParser());
// Bring in Cors to prevent cross-origin blocking.
server.use(
  cors({
    credentials: true,
    origin: true,
  })
);
server.use(express.json());
server.use(helmet());
server.use(csrfProtect);
// Logging Middleware
server.use(morgan("tiny"));

// Use Express Routers here....
server.use("/api/users", UsersRouter);
server.use("/api/auth", AuthRouter);
server.use("/api/goals", goalsRouter);
// End....

// Base URL for server
server.get("/", (req, res) => {
  res.status(200).json({ Message: "Server is up and running!" });
});
// Export Express server
module.exports = server;
