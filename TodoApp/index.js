const form = document.getElementById("form");
const listEl = document.getElementById("list");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(e.target.input.value);
});
const templateList = (id, todo, complete) => `<div class='${
  complete ? "complete" : ""
}' id='${id}'><span>${todo}</span>
  <ul>
  <li><button onclick='completeTodo(${id})'><i class="${
  complete ? "bi bi-x-circle" : "bi bi-check2-circle"
}"></i></button></li>
  <li><button onclick='removeTodo(${id})'><i class="bi bi-trash-fill"></i></button></li>
</ul>
</div>`;
const renderTodo = () => {
  if (localStorage.getItem("todo")) {
    const data = localStorage.getItem("todo");
    JSON.parse(data).forEach((v) => {
      listEl.innerHTML += templateList(v.id, v.todo, v.complete);
    });
  }
};
renderTodo();
const addTodo = (todo) => {
  const data = {
    id: Date.now(),
    todo,
    complete: false,
  };
  listEl.innerHTML += templateList(data.id, data.todo, data.complete);
  upgradeData();
};
const removeTodo = (id) => {
  const div = document.getElementById(id);
  div.remove();
  upgradeData();
};
const completeTodo = (id) => {
  const div = document.getElementById(id);
  div.classList.toggle("complete");
  upgradeData();
  listEl.innerHTML = "";
  const data = localStorage.getItem("todo");
  renderTodo();
};
const upgradeData = () => {
  const div = listEl.querySelectorAll("div");
  const data = [];
  if (!div) return;
  div.forEach((v) => {
    data.push({
      id: v.id,
      todo: v.firstChild.textContent,
      complete: v.classList.contains("complete"),
    });
  });
  localStorage.setItem("todo", JSON.stringify(data));

  // return div[0].classList.contains("complete");
};
