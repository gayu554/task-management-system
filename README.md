# Task Management Application

A web-based Task Management Application developed using **Java, Spring Boot, Spring Security, Spring Data JPA, MySQL, HTML, CSS, and JavaScript**.

## Features

* User Registration
* User Login & Authentication
* User Authorization using Spring Security
* Create new tasks
* View tasks
* Update tasks
* Delete tasks
* Task status tracking

  * Pending
  * In Progress
  * Completed
* Due date management
* Responsive web interface

## Technologies Used

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Java 17         | Backend programming            |
| Spring Boot     | Backend framework              |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | Database operations            |
| MySQL           | Database                       |
| HTML            | Frontend structure             |
| CSS             | Frontend styling               |
| JavaScript      | Dynamic functionality          |
| Maven           | Project management             |

## Project Structure

```text
task-management
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.taskmanagement
│   │   │       ├── config
│   │   │       ├── controller
│   │   │       ├── entity
│   │   │       ├── repository
│   │   │       └── TaskManagementApplication.java
│   │   │
│   │   └── resources
│   │       ├── static
│   │       │   ├── dashboard.html
│   │       │   ├── login.html
│   │       │   ├── register.html
│   │       │   ├── script.js
│   │       │   └── style.css
│   │       └── application.properties
│   │
│   └── test
│
└── pom.xml
```

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/gayu554/task-management-system.git
```

### 2. Open the Project

Open the project in **IntelliJ IDEA**.

### 3. Configure MySQL

Create a MySQL database and update the database configuration in:

```text
src/main/resources/application.properties
```

### 4. Run the Application

Run:

```text
TaskManagementApplication.java
```

### 5. Open in Browser

```text
http://localhost:8080
```

## Future Enhancements

* Real-time task updates using WebSockets
* Task search and filtering
* Task priority levels
* Email notifications
* Cloud deployment

## Author

**Gayatri Gavhane**

GitHub: https://github.com/gayu554

## Repository

https://github.com/gayu554/task-management-system
