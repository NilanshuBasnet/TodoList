const todoInput = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

loadTask();
function addTask(){
    const task= todoInput.value.trim();

    if(task){
        createTaskElement(task);
        saveTask();
        todoInput.value = "";
    }else{
        alert("Do not leave the Fields empty!")
    }
}


addTaskBtn.addEventListener('click', addTask);

function createTaskElement(task){
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${task}</span>
        <button class="delete-task"><img class="delete-icon" src="https://cdn-icons-png.flaticon.com/512/3976/3976961.png" alt="Bin Image"/></button>
        `
    todoList.appendChild(listItem);

    listItem.querySelector(".delete-task").addEventListener("click", function () {
        listItem.remove();
        saveTask(); // Update localStorage
    });
}

function saveTask(){
    let tasks = [];
    todoList.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.trim());
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTask(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}