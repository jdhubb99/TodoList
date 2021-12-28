// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

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
    // CHECKED OFF BUTTON
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = '<i class="fas fa-check"></i>';
    checkedButton.classList.add("checked-button");
    todoDiv.appendChild(checkedButton);
    // DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    // Append to todo list
    todoList.appendChild(todoDiv);
    // Clear todo INPUT VALUE
    todoInput.value = "";
} // addTodo

function deleteCheck(event) {
    const item = event.target;

    // DELETE TODO
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        todo.remove();
    } // if

    // CHECK TODO
    if (item.classList[0] === "checked-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    } // if
} // deleteCheck