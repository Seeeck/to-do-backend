"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
    static initTable(sequelize) {
        Task.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER
            },
            task_name: {
                type: sequelize_1.DataTypes.STRING(40),
                allowNull: false
            },
            task_description: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true
            },
            finished_task: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            task_day: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        }, {
            sequelize: sequelize,
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        });
    }
}
exports.Task = Task;
