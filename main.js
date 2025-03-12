//toggle menu

const toggleBtn = document.querySelector(".toggle");
    const toggleBtnIcon = document.querySelector(".toggle i");
    const dropDown = document.querySelector(".dropdown-menu");

    toggleBtn.onclick = function () {
        dropDown.classList.toggle("open")
    const isOpen = dropDown.classList.contains('open')

    toggleBtnIcon.classList=isOpen
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars"
}

// to do list---------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTasksList();
        updateProgress();
    }
})
let tasks = [];
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
        taskInput.value = ""; 
        saveTasks();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = ""; 
    tasks.forEach((task, index) => { 
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ""}">
                    <input type='checkbox' class='checkbox' ${task.completed ? 'checked' : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-pen-to-square edit-btn" data-index="${index}"></i>
                    <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
                </div>
            </div>
        `;

        taskList.append(listItem);
    });

    
    document.querySelectorAll(".checkbox").forEach((checkbox, i) => {
        checkbox.addEventListener("change", () => toggleTaskComplete(i));
    });

    document.querySelectorAll(".edit-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => editTask(i));
    });

    document.querySelectorAll(".delete-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => deleteTask(i));
    });

    updateProgress();
};

// complete task
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    saveTasks();
};

// edit task
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index, 1);
    updateTasksList();
    saveTasks();

};

// delete task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    saveTasks();

};

// progress bar 
const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    if (totalTasks > 0) {
        const percentage = (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${percentage}%`;
        numbers.textContent = `${totalTasks} / ${completedTasks}  `;
    } else {
        progressBar.style.width = "0%";
        numbers.textContent = "0 / 0";
    }
    if (tasks.length && completedTasks === totalTasks) {
        boomEffect();
    }
};

// add task button
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
// celebration effect
const boomEffect = () => {
    const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}

// to do end-------------------------------------------------------------------------------------

