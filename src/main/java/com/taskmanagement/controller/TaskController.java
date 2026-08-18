package com.taskmanagement.controller;

import com.taskmanagement.entity.Task;
import com.taskmanagement.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // CREATE TASK
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        if (task.getStatus() == null) {
            task.setStatus("PENDING");
        }

        return taskRepository.save(task);
    }

    // GET ALL TASKS
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // GET TASK BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {

        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE TASK
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        return taskRepository.findById(id)
                .map(existingTask -> {

                    existingTask.setTitle(task.getTitle());
                    existingTask.setDescription(task.getDescription());
                    existingTask.setStatus(task.getStatus());
                    existingTask.setDueDate(task.getDueDate());

                    return ResponseEntity.ok(
                            taskRepository.save(existingTask)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE TASK
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {

        if (!taskRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        taskRepository.deleteById(id);

        return ResponseEntity.ok("Task deleted successfully");
    }

    // GET TASKS OF A USER
    @GetMapping("/user/{userId}")
    public List<Task> getUserTasks(@PathVariable Long userId) {
        return taskRepository.findByUserId(userId);
    }
}