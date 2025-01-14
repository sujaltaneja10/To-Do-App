const todos = require("../db/todos.json");
const fs = require("fs/promises");
const eventHandler = require("express-async-handler");

function updateTodos() {
  fs.writeFile(__dirname + "/../db/todos.json", JSON.stringify(todos));
}

function createUser(username, password) {
  todos.push({
    username,
    password,
    todos: [],
  });
  updateTodos();
}

function getByUsername(username) {
  return todos.find((u) => u.username === username);
}

function getByUsernameAndPassword(username, password) {
  return todos.find((u) => u.username === username && u.password === password);
}

async function getAllTodo(req, res, next) {
  return res.json(req.user.todos);
}

async function createTodo(req, res, next) {
  const todo = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    desc: req.body.desc,
  };
  req.user.todos.push(todo);
  updateTodos();

  return res.json({
    message: "To do created",
  });
}

const updateTodo = eventHandler(async function (req, res, next) {
  const id = req.params.id;
  const title = req.body.title;
  const desc = req.body.desc;

  const todo = req.user.todos.find((u) => u.id == id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  todo.title = title;
  todo.desc = desc;

  updateTodos();

  return res.json({
    message: "Updated todo",
  });
});

async function deleteTodo(req, res, next) {
  console.log(req.user);
  console.log(req.user.todos);
  req.user.todos = [];

  updateTodos();

  return res.json({
    message: "Deleted all todos for the user",
  });
}

const deleteTodoById = eventHandler(async function (req, res, next) {
  const id = req.params.id;
  const index = req.user.todos.findIndex((u) => u.id == id);

  if (index === -1) {
    throw new Error("To do not found");
  }

  req.user.todos.splice(index, 1);

  updateTodos();

  return res.json({
    message: "Todo deleted",
  });
});

module.exports = {
  createUser,
  getByUsername,
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodoById,
  getByUsernameAndPassword,
};
