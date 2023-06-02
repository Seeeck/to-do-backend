
import { Sequelize, DataTypes, Model } from "sequelize";



class Task extends Model {
    // Define other properties and methods of the Task model here
  }
  const defineTaskModel = (sequelize: Sequelize) => {
    Task.init(
      {
        // Model attributes are defined here
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER
        },
        task_name: {
          type: DataTypes.STRING(40),
          allowNull: false
        },
        task_description: {
          type: DataTypes.STRING(500),
          allowNull: true
        },
        finished_task: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        task_day: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: true
      }
    );
  };
  
  export { defineTaskModel, Task };

