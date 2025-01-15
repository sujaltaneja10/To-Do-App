const eventHandler = require("express-async-handler");
const { createUser } = require("./todosController.js");
const { getByUsername } = require("./todosController.js");

const signUpController = async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = getByUsername(username);

    if (user) {
      return res.status(411).json({
        message: "User already exists",
      });
    }

    createUser(username, password);

    return res.send({
      message: "User signed up",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUpController;
