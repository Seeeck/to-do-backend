import { Sequelize, DataTypes, Model } from "sequelize";
import { Task } from "./task";

class User extends Model {
  // Define other properties and methods of the User model here
}

const defineUserModel = (sequelize: Sequelize) => {
  const user_model = User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: true
    }
  );

  // Define the "hasMany" relationship with Task
  user_model.hasMany(Task);
};

export { defineUserModel, User };