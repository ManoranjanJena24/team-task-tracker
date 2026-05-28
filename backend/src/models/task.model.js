const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const taskStatus = require("../constants/taskStatus");
const taskPriority = require("../constants/taskPriority");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    priority: {
      type: DataTypes.ENUM(
        taskPriority.LOW,
        taskPriority.MEDIUM,
        taskPriority.HIGH,
      ),
      defaultValue: taskPriority.MEDIUM,
    },

    status: {
      type: DataTypes.ENUM(
        taskStatus.TODO,
        taskStatus.IN_PROGRESS,
        taskStatus.IN_REVIEW,
        taskStatus.DONE,
        taskStatus.BLOCKED,
      ),
      defaultValue: taskStatus.TODO,
    },

    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,

    indexes: [
      {
        fields: ["status"],
      },
      {
        fields: ["assignee_id"],
      },
      {
        fields: ["due_date"],
      },
    ],
  },
);

module.exports = Task;
