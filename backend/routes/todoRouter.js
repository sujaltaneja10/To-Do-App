const { Router } = require("express");
const todoRouter = Router();

const {
  createUser,
  getByUsername,
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodoById,
} = require("../controllers/todosController.js");

todoRouter.get("/", getAllTodo);
todoRouter.post("/", createTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodoById);
todoRouter.delete("/", deleteTodo);
// todoRouter.get("/search", searchTodo);

module.exports = todoRouter;
