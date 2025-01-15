export { createTodo, updateTodo, fetchTodos, deleteTodo };
const TODO_URL = "https://to-do-app-yt61.onrender.com/todos/";

async function createTodo({ title, desc }) {
  const response = await fetch(TODO_URL, {
    headers: {
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    },
    method: "POST",
    body: JSON.stringify({ title, desc }),
  });
  const data = await response.json();
  return data;
}

async function updateTodo(id, { title, desc }) {
  const response = await fetch(TODO_URL + id, {
    headers: {
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    },
    method: "PUT",
    body: JSON.stringify({ title, desc }),
  });
  const data = await response.json();
  return data;
}

async function fetchTodos() {
  const response = await fetch(TODO_URL, {
    headers: {
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    },
    method: "GET",
  });
  const data = await response.json();
  return data;
}

async function deleteTodo(id) {
  const response = await fetch(TODO_URL + id, {
    headers: {
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    },
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}
