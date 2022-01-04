// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// functions
function addTodo(event) {
    // prevents form from submitting
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // add todos to local storage
    saveLocalTodos(todoInput.value);

    // checked off button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add("checked-button");
    todoDiv.appendChild(checkedButton);

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    // append to todo list
    todoList.appendChild(todoDiv);
    // clear todo INPUT VALUE
    todoInput.value = "";
} // addTodo

function deleteCheck(event) {
    const item = event.target;

    // DELETE TODO
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        deleteLocalTodos(todo);
        todo.remove();
    } // if

    // CHECK TODO
    if (item.classList[0] === "checked-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    } // if
} // deleteCheck

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        const mStyle = todo.style;
        if (mStyle != undefined && mStyle != null) {
            switch (event.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        mStyle.display = "flex";
                    } else {
                        mStyle.display = "none";
                    } // if else
                    break;
                case "uncompleted":
                    if (todo.classList.contains("completed")) {
                        mStyle.display = "none";
                    } else {
                        mStyle.display = "flex";
                    } // if else
                    break;
            } // switch
        } // if
    }); // forEach
} // filterTodo

function saveLocalTodos(todo) {
    // check if local todos array has elements
    let todos = checkLocalTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
} // saveLocalTodos

function getTodos() {
    // check if local todos array has elements
    let todos = checkLocalTodos();

    todos.forEach(function (todo) {
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // checked off button
        const checkedButton = document.createElement("button");
        checkedButton.innerHTML = '<i class="fas fa-check"></i>';
        checkedButton.classList.add("checked-button");
        todoDiv.appendChild(checkedButton);
        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);
        // append to todo list
        todoList.appendChild(todoDiv);
    }); // forEach
} // getTodos

function deleteLocalTodos(todo) {
    // check if local todos array has elements
    let todos = checkLocalTodos();
    // inner text of the todo div 
    const todoIndex = todo.children[0].innerText;
    // removes/splices the given index of the selected div in todos array
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
} // deleteLocalTodos

function checkLocalTodos() {
    let todos;
    // check if local todos array has elements
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } // if else
    return todos;
} // checkLocalTodos