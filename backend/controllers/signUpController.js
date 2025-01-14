const eventHandler = require("express-async-handler");
const { createUser } = require("./todosController.js");
const { getByUsername } = require("./todosController.js");

const signUpController = eventHandler(async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const user = getByUsername(username);

  if (user) {
    throw new Error("User already exists");
  }

  createUser(username, password);

  return res.send({
    message: "User signed up",
  });
});

module.exports = signUpController;
