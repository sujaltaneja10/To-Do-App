const { getByUsernameAndPassword } = require("./todosController.js");
const jwt = require("jsonwebtoken");
const eventHandler = require("express-async-handler");
const JWT_SECRET = process.env.JWT_SECRET;

const signInController = eventHandler(async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const user = getByUsernameAndPassword(username, password);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign({ username }, JWT_SECRET);

  res.setHeader("Access-Control-Expose-Headers", "token");
  res.header("token", token);

  return res.json({
    message: "User signed in",
  });
});

module.exports = signInController;
