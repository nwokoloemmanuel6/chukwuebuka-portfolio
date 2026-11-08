// Academic Planner
// Every task is an object like { text: "Revise Week 4", done: false }
// and all the tasks are kept in the tasks array.

let tasks = [];

// Get the parts of the page we need to work with
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const clearButton = document.getElementById("clearButton");
const clearAllButton = document.getElementById("clearAllButton");

// Save the tasks in the browser so they are still there after a refresh
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Load the saved tasks when the page opens
function loadTasks() {
    const saved = localStorage.getItem("myTasks");
    if (saved !== null) {
        tasks = JSON.parse(saved);
    }
}

// Show all the tasks on the page
function showTasks() {
    taskList.innerHTML = "";   // clear the old list first

    for (let i = 0; i < tasks.length; i++) {
        const item = document.createElement("li");

        // checkbox to mark the task as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].done;
        checkbox.addEventListener("change", function () {
            toggleTask(i);
        });

        // the task text
        const text = document.createElement("span");
        text.textContent = tasks[i].text;
        if (tasks[i].done) {
            text.className = "done";   // crosses the text out
        }

        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(i);
        });

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteButton);
        taskList.appendChild(item);
    }

    updateCounter();
}

// Show how many tasks are finished
function updateCounter() {
    let finished = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done) {
            finished = finished + 1;
        }
    }

    if (tasks.length === 0) {
        counter.textContent = "You have no tasks yet.";
    } else {
        counter.textContent = finished + " of " + tasks.length + " tasks completed";
    }
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        message.textContent = "Please write a task first.";
        return;
    }

    tasks.push({ text: text, done: false });
    taskInput.value = "";
    message.textContent = "";

    saveTasks();
    showTasks();
}

// Mark a task as completed (or not completed)
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    showTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
}

// Remove all the tasks that are completed
function clearCompleted() {
    const remaining = [];   // a new empty list for the tasks we want to keep

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done === false) {
            remaining.push(tasks[i]);   // keep only the tasks that are NOT done
        }
    }

    if (remaining.length === tasks.length) {
        message.textContent = "There are no completed tasks to clear.";
        return;
    }

    tasks = remaining;       // replace the old list with the new one
    message.textContent = "";
    saveTasks();
    showTasks();
}

// Remove ALL the tasks
function clearAll() {
    if (tasks.length === 0) {
        message.textContent = "There are no tasks to clear.";
        return;
    }

    // ask first, because this cannot be undone
    const sure = confirm("Delete all your tasks?");
    if (sure === true) {
        tasks = [];          // an empty list
        message.textContent = "";
        saveTasks();
        showTasks();
    }
}

// Events
addButton.addEventListener("click", addTask);
clearButton.addEventListener("click", clearCompleted);
clearAllButton.addEventListener("click", clearAll);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Start the planner
loadTasks();
showTasks();
