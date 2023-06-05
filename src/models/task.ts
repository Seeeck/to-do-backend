
import { DataTypes, Model } from "sequelize";
import db from "../config/database";



class Task extends Model {

}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  task_title: {
    type: DataTypes.STRING(40),
    allowNull: false,

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
}, {
  sequelize: db,
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  tableName:"Tasks"
})


export { Task };

