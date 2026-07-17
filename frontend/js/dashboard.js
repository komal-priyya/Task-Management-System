


let editingId = null;

const addBtn = document.querySelector(".add-btn");

const todosBox = document.querySelector(".todos-box");

const titleField = document.querySelector(".title-field");
const descriptionField = document.querySelector(".description-field");
const statusField = document.querySelector(".status-field");

function createTodoCard(todo) {

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoCard");

    let title = document.createElement("h3");
    title.innerText = todo.title;

    let description = document.createElement("p");
    description.innerText = todo.description;

    let status = document.createElement("p");
    status.innerHTML = `<strong>Status :</strong> ${todo.status}`;

    if (todo.status === "completed") {
        status.style.color = "green";
    } else {
        status.style.color = "orange";
    }

    const menuBtn = document.createElement("button");
    menuBtn.innerText = "⋮";

    const menu = document.createElement("div");
    menu.classList.add("menu");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    menu.append(editBtn, deleteBtn);

    todoDiv.append(
        title,
        description,
        status,
        menuBtn,
        menu
    );

    todosBox.append(todoDiv);

    menu.style.display = "none";

    menuBtn.addEventListener("click", () => {

        menu.style.display =
            menu.style.display === "none"
                ? "block"
                : "none";

    });

    deleteBtn.addEventListener("click", () => {

        todoDiv.remove();

        let todos =
            JSON.parse(localStorage.getItem("todos")) || [];

        todos = todos.filter(t => t.id !== todo.id);

        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );

    });

let isEditing = false;

let titleInput;
let descInput;
let statusSelect;

editBtn.addEventListener("click", () => {

    if (!isEditing) {

        // Create inputs
        titleInput = document.createElement("input");
        titleInput.value = todo.title;

        descInput = document.createElement("textarea");
        descInput.value = todo.description;

        statusSelect = document.createElement("select");

        statusSelect.innerHTML = `
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        `;

        statusSelect.value = todo.status;

        // Replace text with inputs
        title.replaceWith(titleInput);
        description.replaceWith(descInput);
        status.replaceWith(statusSelect);

        isEditing = true;
        editBtn.innerText = "Save";

    } else {

        // Save updated values
        todo.title = titleInput.value;
        todo.description = descInput.value;
        todo.status = statusSelect.value;

        // Update localStorage
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        todos = todos.map(t => t.id === todo.id ? todo : t);

        localStorage.setItem("todos", JSON.stringify(todos));

        // Create new elements
        title = document.createElement("h3");
        title.innerText = todo.title;

        description = document.createElement("p");
        description.innerText = todo.description;

        status = document.createElement("p");
        status.innerHTML = `<strong>Status :</strong> ${todo.status}`;

        status.style.color =
            todo.status === "completed" ? "green" : "orange";

        // Replace inputs back with text
        titleInput.replaceWith(title);
        descInput.replaceWith(description);
        statusSelect.replaceWith(status);

        isEditing = false;
        editBtn.innerText = "Edit";
    }

});

}



addBtn.addEventListener("click", async () => {

    if (
        titleField.value.trim() === "" ||
        descriptionField.value.trim() === ""
    ) {
        return;
    }

    // let todos =
    //     JSON.parse(localStorage.getItem("todos")) || [];

    if (editingId === null) {

        const response= await fetch("http://127.0.0.1:3000/api/todos",{
            method:"POST",

            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",



            body:JSON.stringify({
                title:titleField.value,
                description:descriptionField.value,
                status:statusField.value
            })
        })
const data= await response.json();
console.log(data)
       

    }

    else {

        todos = todos.map(todo => {

            if (todo.id === editingId) {

                todo.title = titleField.value;

                todo.description = descriptionField.value;

                todo.status = statusField.value;

            }

            return todo;

        });

        localStorage.setItem(
            "todos",
            JSON.stringify(todos)
        );

        location.reload();

        editingId = null;

        addBtn.innerText = "+ Add Todo";

    }

    titleField.value = "";

    descriptionField.value = "";

    statusField.value = "pending";

});