import { createTodo, updateTodo, fetchTodos, deleteTodo } from "./todo.js";

export async function showTodoScreen() {
  if (document.querySelectorAll(".todo-div")) {
    document.querySelectorAll(".todo-div").forEach((element) => {
      element.remove();
    });
  }

  const container = document.querySelector(".todos-container");
  const userTodos = await fetchTodos();
  userTodos.forEach((todo) => {
    renderTodo(todo);
  });
}

async function renderTodo(todo) {
  const container = document.querySelector(".todos-container");
  const btn = document.querySelector(".create-todo-btn");

  const todoDiv = document.createElement("div");
  todoDiv.classList.add(`todo-div-${todo.id}`);
  todoDiv.classList.add("todo-div");

  todoDiv.innerHTML = `
    <p class='todo-title todo-title-${todo.id}' data-id='${todo.id}'>${todo.title}</p>
    <p class='todo-desc todo-desc-${todo.id}' data-id='${todo.id}'>${todo.desc}</p>
    <button class='todo-edit-btn todo-edit-btn-${todo.id}' data-id='${todo.id}'>Edit</button>
    <button class='todo-delete-btn todo-delete-btn-${todo.id}' data-id='${todo.id}'>Delete</button>
  `;

  todoDiv.style =
    "display: flex; flex-direction: row; justify-content: space-between";

  container.insertBefore(todoDiv, btn);

  // To update a todo
  document
    .querySelector(`.todo-edit-btn-${todo.id}`)
    .addEventListener("click", async (event) => {
      let todoId = event.target.dataset.id;

      const title = prompt("Enter the title : ");
      const desc = prompt("Enter the description : ");

      if (!title || !desc) return;

      const message = await updateTodo(todoId, { title, desc });

      event.target.parentElement.querySelector(".todo-title").textContent =
        title;
      event.target.parentElement.querySelector(".todo-desc").textContent = desc;
    });

  // To delete a todo
  document
    .querySelector(`.todo-delete-btn-${todo.id}`)
    .addEventListener("click", async (event) => {
      event.preventDefault();
      let todoId = event.target.dataset.id;
      const message = await deleteTodo(todoId);

      event.target.parentElement.remove();
    });
}

// To create a todo
document
  .querySelector(".create-todo-btn")
  .addEventListener("click", async () => {
    const title = prompt("Enter the title : ");
    const desc = prompt("Enter the description : ");

    if (!title || !desc) return;

    const data = await createTodo({ title, desc });
    renderTodo(data.todo);
  });
