"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponse_1 = __importDefault(require("../helpers/apiResponse"));
const task_1 = require("../models/task");
class TaskRepositorie {
    createTask(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task_instance = task_1.Task.build({
                    id: 1,
                    user_id: 20,
                    task_name: "crear algo",
                    task_description: "holaaaaa",
                    finished_task: false,
                    task_day: Date()
                });
                const res = yield task_instance.save();
                console.log("task creation");
                return apiResponse_1.default.successResponse(response, {}, 202);
            }
            catch (e) {
               
                return apiResponse_1.default.errorResponse(response, "task creation error", 505);
            }
        });
    }
    listTask(request, response) {
        return response;
    }
    updateTask(request, response) {
        return response;
    }
    deleteTask(request, response) {
        return response;
    }
}
exports.default = TaskRepositorie;
