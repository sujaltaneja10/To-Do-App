const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const path = require("path");
const frontendPath = path.join(__dirname, "../frontend");

const auth = require("./middlewares/auth.js");
const signUpController = require("./controllers/signUpController.js");
const signInController = require("./controllers/signInController.js");
const todoRouter = require("./routes/todoRouter.js");

app.use(cors());
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(express.json());

// Authentication
app.post("/signup", signUpController);
app.post("/signin", signInController);

// CRUD on todos
app.get("/me", auth, (req, res) => {
  return res.json(req.user);
});

app.use(auth);
app.use("/todos", todoRouter);

app.use((err, req, res, next) => {
  return res.status(200).json({
    error: req.error,
  });
});

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
