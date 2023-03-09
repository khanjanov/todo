const newTodo = document.querySelector(".input-todo");
const addNewTodoBtn = document.querySelector(".btn-addTodo");
const todoList = document.querySelector(".todoList");

addNewTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteDoneTodo);
document.addEventListener("DOMContentLoaded", localStorageOku);

function deleteDoneTodo(e) {
  const clickedElem = e.target;
  if (clickedElem.classList.contains("todo-done-btn")) {
    clickedElem.parentElement.classList.toggle("todo-done");
  }
  if (clickedElem.classList.contains("todo-delete-btn")) {
    if (confirm("Are you sure? | this process is permanent")) {
      clickedElem.parentElement.classList.toggle("getLost");
      const todoThatWillDelete =
        clickedElem.parentElement.children[0].innerText;
      localStorageSil(todoThatWillDelete);

      clickedElem.parentElement.addEventListener("transitionend", function () {
        clickedElem.parentElement.remove();
      });
    }
  }
}

function addTodo(e) {
  e.preventDefault();

  if (newTodo.value.length > 0) {
    createTodoItem(newTodo.value);

    // save in localstorage
    readLocalStorage(newTodo.value);
    newTodo.value = "";
  } else {
    alert("you can't add empty todo");
  }
}

function readLocalStorage(newTodo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function localStorageOku() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    createTodoItem(todo);
  });
}

function createTodoItem(todo) {
  // create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item");

  // create li
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-description");
  todoLi.innerText = todo;
  todoDiv.appendChild(todoLi);

  // add "delete" button
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.classList.add("todo-btn");
  deleteTodoBtn.classList.add("todo-done-btn");
  deleteTodoBtn.innerHTML = `<i class="far fa-check-square"></i>`;
  todoDiv.appendChild(deleteTodoBtn);

  // add "done" button
  const todoDoneBtn = document.createElement("button");
  todoDoneBtn.classList.add("todo-btn");
  todoDoneBtn.classList.add("todo-delete-btn");
  todoDoneBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  todoDiv.appendChild(todoDoneBtn);

  // add created div to ul
  todoList.appendChild(todoDiv);
}

function localStorageSil(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // delete item with splice
  const indexOfElemThatWillDelete = todos.indexOf(todo);
  console.log(indexOfElemThatWillDelete);
  todos.splice(indexOfElemThatWillDelete, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
