import { DataTypes, Model } from "sequelize";
import db from "../config/database";

class User extends Model {
  // Define other properties and methods of the User model here
}

User.init(
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
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive', 'pending'],
      defaultValue: "inactive"
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    timestamps: true,
    createdAt: true,
    updatedAt: true
  }
);


export { User };