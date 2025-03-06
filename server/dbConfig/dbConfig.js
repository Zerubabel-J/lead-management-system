const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "";
const dbConfig = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = { dbConfig };
