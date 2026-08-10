const input = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");
const taskCount = document.getElementById("taskCount");
const filterBtns = document.querySelectorAll(".filterBtn");

// -------- Safe localStorage helpers --------
// kuch browsers file:// se khole pa localStorage block/error kar dete hain,
// isliye try-catch lagaya hai taaki poora script fail na ho, memory mein hi kaam chalta rahe
let storageWorks = true;

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn("localStorage read failed, using in-memory data instead:", err);
    storageWorks = false;
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn("localStorage write failed, changes won't persist after refresh:", err);
    storageWorks = false;
  }
}

// tasks ko yahan store karenge (array of objects), localStorage se load hoga
let tasks = loadFromStorage("tasks", []);
let currentFilter = "all";

// -------- Dark mode --------
// pehle se saved theme check karo, warna default light
try {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }
} catch (err) {
  console.warn("Could not read saved theme:", err);
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (err) {
    console.warn("Could not save theme:", err);
  }
});

// -------- Add task (yahi feature pehle kaam nahi kar raha tha) --------
// bug tha: getElementById("addBtn") mein curly quotes (" ") the
// curly quotes JavaScript ke liye invalid hote hain, isliye poora script fail ho raha tha
// niche seedhe/straight quotes use kiye hain, ab yeh sahi chalega

function addTask() {
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    time: timeInput.value,       // empty rah sakta hai, optional hai
    priority: priorityInput.value,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  // form reset
  input.value = "";
  timeInput.value = "";
  priorityInput.value = "medium";
  input.focus();
}

addBtn.addEventListener("click", addTask);

// Enter key dabane par bhi task add ho jaaye
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// -------- Delete task --------
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

// -------- Done / undone toggle --------
function toggleDone(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    renderTasks();
  }
}

// -------- Filters --------
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.done);
  if (currentFilter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

// -------- Save to localStorage --------
function saveTasks() {
  saveToStorage("tasks", tasks);
}

// -------- Render list on screen --------
function renderTasks() {
  taskList.innerHTML = "";
  const visibleTasks = getFilteredTasks();

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    const dot = document.createElement("span");
    dot.className = "priorityDot priority-" + task.priority;

    const taskText = document.createElement("span");
    taskText.className = "taskText";
    taskText.textContent = task.text;
    taskText.addEventListener("click", () => toggleDone(task.id));

    li.appendChild(dot);
    li.appendChild(taskText);

    if (task.time) {
      const timeSpan = document.createElement("span");
      timeSpan.className = "taskTime";
      timeSpan.textContent = task.time;
      li.appendChild(timeSpan);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  const remaining = tasks.filter((t) => !t.done).length;
  taskCount.textContent = remaining + " task(s) left · " + tasks.length + " total";
}

// pehli baar page load hote hi purane tasks dikha do
renderTasks();