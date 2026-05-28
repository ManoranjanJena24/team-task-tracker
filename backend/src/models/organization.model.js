const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "organizations",
    timestamps: true,
  },
);

module.exports = Organization;
