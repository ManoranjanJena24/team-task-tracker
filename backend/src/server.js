require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");
const redisClient = require("./config/redis");

// Import models
require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");

    await redisClient.connect();
    console.log("Redis connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup error:", error);
  }
};

startServer();
