const Organization = require("./organization.model");
const User = require("./user.model");
const Project = require("./project.model");
const Task = require("./task.model");

/*
========================
ORGANIZATION RELATIONS
========================
*/

Organization.hasMany(User, {
  foreignKey: "organization_id",
});

User.belongsTo(Organization, {
  foreignKey: "organization_id",
});

/*
========================
PROJECT RELATIONS
========================
*/

Organization.hasMany(Project, {
  foreignKey: "organization_id",
});

Project.belongsTo(Organization, {
  foreignKey: "organization_id",
});

User.hasMany(Project, {
  foreignKey: "created_by",
});

Project.belongsTo(User, {
  foreignKey: "created_by",
});

/*
========================
TASK RELATIONS
========================
*/

Project.hasMany(Task, {
  foreignKey: "project_id",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
});

User.hasMany(Task, {
  foreignKey: "assignee_id",
});

Task.belongsTo(User, {
  foreignKey: "assignee_id",
});

module.exports = {
  Organization,
  User,
  Project,
  Task,
};
