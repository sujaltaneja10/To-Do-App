const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

const auth = require("./middlewares/auth.js");
const signUpController = require("./controllers/signUpController.js");
const signInController = require("./controllers/signInController.js");
const todoRouter = require("./routes/todoRouter.js");

app.use(cors());
app.use(express.json());

// Authentication
app.post("/signup", signUpController);
app.post("/signin", signInController);

// CRUD on todos
app.get("/me", auth, (req, res) => {
  return res.json(req.user);
});

app.use("/todos", auth, todoRouter);

app.use((err, req, res, next) => {
  return res.status(404).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
