let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

/* Save to localStorage */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Add task */
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return;

    tasks.push({
        text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

/* Toggle complete/incomplete */
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
    checkAllCompleted();
}

/* Delete task */
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    checkAllCompleted();
}

/* Set filter */
function setFilter(value, event) {
    filter = value;

    document.querySelectorAll(".filters button")
        .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    renderTasks();
}

/* Filter logic */
function getFilteredTasks() {
    if (filter === "Active") return tasks.filter(t => !t.completed);
    if (filter === "completed") return tasks.filter(t => t.completed);
    return tasks;
}

/* Render tasks */
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    getFilteredTasks().forEach(task => {
        const index = tasks.indexOf(task);

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="task ${task.completed ? "completed" : ""}"
                  onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <button class="delete" onclick="deleteTask(${index})">X</button>
        `;

        list.appendChild(li);
    });

    checkAllCompleted();
}

/* 🎉 Check if all tasks completed */
function checkAllCompleted() {
    if (tasks.length > 0 && tasks.every(t => t.completed)) {
        showCongrats();
    }
}

/* Show congratulations */
function showCongrats() {
    const box = document.getElementById("congrats");
    box.classList.remove("hidden");

    setTimeout(() => {
        box.classList.add("hidden");
    }, 2500);
}

/* Initial render */
renderTasks();