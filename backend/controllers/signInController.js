const { getByUsernameAndPassword } = require("./todosController.js");
const jwt = require("jsonwebtoken");
const eventHandler = require("express-async-handler");
const JWT_SECRET = process.env.JWT_SECRET;

const signInController = async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = getByUsernameAndPassword(username, password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ username }, JWT_SECRET);

    res.setHeader("Access-Control-Expose-Headers", "token");
    res.header("token", token);

    return res.json({
      message: "User signed in",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signInController;
