const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/mern-chat-app";

const connectDb = async (req, res) => {
  try {
    await mongoose
      .connect(url)
      .then(() => {
        console.log("database connected");
      })
      .catch((error) => {
        console.log("database connected");
      });
  } catch (error) {
    console.log("database connected");
  }
};

module.exports = connectDb;
