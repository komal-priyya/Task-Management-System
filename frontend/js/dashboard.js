


let editingId = null;

const addBtn = document.querySelector(".add-btn");

const todosBox = document.querySelector(".todos-box");

const titleField = document.querySelector(".title-field");
const descriptionField = document.querySelector(".description-field");
const statusField = document.querySelector(".status-field");


async function loadTodos() {
    try {
        console.log("loadTodos started");

        const response = await fetch("http://127.0.0.1:3000/api/todos", {
            method: "GET",
            credentials: "include"
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        data.data.forEach(todo => {
            createTodoCard(todo);
        });

    } catch (error) {
        console.error(error);
    }
}


loadTodos();
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

    deleteBtn.addEventListener("click", async () => {

        try{
            console.log(todo);
console.log(todo._id);
const response= await fetch(`http://127.0.0.1:3000/api/todos/${todo._id}`,{

    method:"DELETE",
    credentials:"include",

})
 
console.log(response);
  const data = await response.json()
    console.log(data)

if(data.success){todoDiv.remove()}

        }catch(error){
            console.error(error)
        }

        
    });

let isEditing = false;

let titleInput;
let descInput;
let statusSelect;

editBtn.addEventListener("click", async() => {

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
        const updateTitle = titleInput.value;
    const updateDescription = descInput.value;
        const updatedStatus = statusSelect.value;
try{

const response = await fetch(`http://127.0.0.1:3000/api/todos/${todo._id}`,{
    method: 'PUT',
    headers:{
        "Content-Type": "application/json"
    },
credentials:"include",

body: JSON.stringify({
    title: todo.title,
    description: todo.description,
    status: todo.status
})




})
console.log(response);
  const data = await response.json()
    console.log(data)


    if(data.success){



   // Update local todo object only after backend succeeds
            todo.title = updateTitle;
            todo.description = updateDescription;
            todo.status = updatedStatus;



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
    }else{
        alert(data.message)
    }
}catch(error){
    console.error(error)
     alert("Something went wrong. Please try again.");
}
        
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
       

createTodoCard(data.data)

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

       

        location.reload();

        editingId = null;

        addBtn.innerText = "+ Add Todo";

    }

    titleField.value = "";

    descriptionField.value = "";

    statusField.value = "pending";

});