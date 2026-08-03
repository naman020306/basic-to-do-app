const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    input.value = "";
});

/*Iska matlab hai:

Jab user Add button par click kare, tab { } ke andar wala code chalao.

Jaise hi Add button dabega:

Input se task liya jayega.
Check hoga task empty to nahi.
Naya <li> banega.
Delete button banega.
Task list me add ho jayega.
Input box khali ho jayega. */