

const taskInput = document.getElementById("taskInput"); 
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList"); 
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

// Sabse pehle DOM elements ko select karenge


let taskCount = 0; // Total task count
let completedCount = 0; // Completed task count

// Function jo ek new task list me add karega
function addTask() {
  const taskText = taskInput.value.trim(); // Input value le rahe hain, extra spaces hatakar

  if (taskText === "") {
    alert("⚠️ Please enter a task!"); // Agar empty hai to alert dikhao
    return;
  }

  // Naya task create karenge
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item"); 
  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="complete-btn">✔</button>
    <button class="delete-btn">❌</button>
  `;

  // Task list me append karenge
  taskList.appendChild(taskItem);
  taskInput.value = ""; 
  taskCount++;  
  updateStats();

  // Agar pehle "No tasks yet" dikh raha hai, to use hata do
  const emptyMessage = document.querySelector(".empty-list");
  if (emptyMessage) {
    emptyMessage.remove();
  }

  // Complete button pe event listener lagayenge
  const completeButton = taskItem.querySelector(".complete-btn");
  completeButton.addEventListener("click", () => {
    taskItem.classList.toggle("completed"); 
    if (taskItem.classList.contains("completed")) {
      completedCount++;
    } else {
      completedCount--;
    }
    updateStats();
  });

  // Delete button pe event listener lagayenge
  const deleteButton = taskItem.querySelector(".delete-btn");
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    taskCount--; 
    if (taskItem.classList.contains("completed")) {
      completedCount--; 
    }
    updateStats(); 

    // Agar list khali ho gayi to "No tasks yet" message wapas show karo
    if (taskList.children.length === 0) {
      taskList.innerHTML = `<li class="empty-list">No tasks yet. Add one above!</li>`;
    }
  });
}

// Function jo task stats update karega
function updateStats() {
  totalTasks.textContent = `Total tasks: ${taskCount}`;
  completedTasks.textContent = `Completed: ${completedCount}`;
}

// Add button pe event listener lagayenge
addButton.addEventListener("click", addTask);

// Agar user "Enter" press kare to bhi task add ho
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

