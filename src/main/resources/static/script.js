// ===============================
// GET LOGGED-IN USER
// ===============================

const userId = localStorage.getItem("userId");


// If user is not logged in
if (!userId) {
    window.location.href = "login.html";
}


// ===============================
// ADD TASK
// ===============================

function addTask() {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;
    const dueDate = document.getElementById("dueDate").value;

    // Validation
    if (title === "") {
        alert("Please enter task title");
        return;
    }

    if (description === "") {
        alert("Please enter task description");
        return;
    }

    if (dueDate === "") {
        alert("Please select due date");
        return;
    }


    const task = {

        title: title,

        description: description,

        status: status,

        dueDate: dueDate,

        userId: Number(userId)
    };


    fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(task)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Task creation failed");
        }

        return response.json();

    })

    .then(data => {

        document.getElementById("message").innerText =
            "Task added successfully!";


        // Clear fields
        document.getElementById("title").value = "";

        document.getElementById("description").value = "";

        document.getElementById("status").value = "PENDING";

        document.getElementById("dueDate").value = "";


        // Refresh task list
        loadTasks();

    })

    .catch(error => {

        console.error(error);

        document.getElementById("message").innerText =
            "Failed to add task";

    });
}



// ===============================
// LOAD USER TASKS
// ===============================

function loadTasks() {

    fetch(`/api/tasks/user/${userId}`)

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        return response.json();

    })

    .then(tasks => {

        const taskList =
            document.getElementById("taskList");


        taskList.innerHTML = "";


        // No tasks
        if (tasks.length === 0) {

            taskList.innerHTML =
                "<p>No tasks found.</p>";

            return;
        }


        // Display tasks
        tasks.forEach(task => {

            taskList.innerHTML += `

                <div class="task-card">

                    <h3>
                        ${task.title || ""}
                    </h3>

                    <p>
                        ${task.description || ""}
                    </p>

                    <span class="status">
                        ${task.status || "PENDING"}
                    </span>

                    <p>
                        Due Date:
                        ${task.dueDate || "Not set"}
                    </p>

                    <div class="task-buttons">

                        <button
                            class="edit-btn"
                            onclick="editTask(${task.id})">
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteTask(${task.id})">
                            Delete
                        </button>

                    </div>

                </div>

            `;

        });

    })

    .catch(error => {

        console.error(error);

        document.getElementById("taskList").innerHTML =
            "<p>Failed to load tasks.</p>";

    });
}



// ===============================
// EDIT TASK
// ===============================

function editTask(id) {

    const title =
        prompt("Enter new title:");

    if (title === null) {
        return;
    }


    const description =
        prompt("Enter new description:");

    if (description === null) {
        return;
    }


    const status =
        prompt(
            "Enter status: PENDING / IN_PROGRESS / COMPLETED"
        );

    if (status === null) {
        return;
    }


    const dueDate =
        prompt("Enter due date: YYYY-MM-DD");

    if (dueDate === null) {
        return;
    }


    const task = {

        title: title,

        description: description,

        status: status,

        dueDate: dueDate
    };


    fetch(`/api/tasks/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(task)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Update failed");
        }

        return response.json();

    })

    .then(data => {

        alert("Task updated successfully!");

        loadTasks();

    })

    .catch(error => {

        console.error(error);

        alert("Failed to update task");

    });
}



// ===============================
// DELETE TASK
// ===============================

function deleteTask(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this task?");


    if (!confirmDelete) {
        return;
    }


    fetch(`/api/tasks/${id}`, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        return response.text();

    })

    .then(data => {

        alert("Task deleted successfully!");

        loadTasks();

    })

    .catch(error => {

        console.error(error);

        alert("Failed to delete task");

    });
}



// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("userId");

    window.location.href = "login.html";
}



// ===============================
// LOAD TASKS WHEN PAGE OPENS
// ===============================

loadTasks();