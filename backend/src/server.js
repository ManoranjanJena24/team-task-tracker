// require("dotenv").config();

// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");
const redisClient = require("./config/redis");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

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
