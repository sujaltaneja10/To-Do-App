const { getByUsername } = require("../controllers/todosController.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  const user = getByUsername(decodedData.username);

  if (!user) {
    return res.status(404).json({
      message: "User not signed in",
    });
  }

  req.user = user;
  next();
}

module.exports = auth;
