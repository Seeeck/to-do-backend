"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskController {
    constructor(taskInterface) {
        this.tasks = taskInterface;
    }
    createTask(request, response) {
        return this.tasks.createTask(request, response);
    }
    listTask(request, response) {
        return this.tasks.listTask(request, response);
    }
    updateTask(request, response) {
        return this.tasks.updateTask(request, response);
    }
    deleteTask(request, response) {
        return this.tasks.deleteTask(request, response);
    }
}
exports.default = TaskController;
