const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    setTimeout(connectDB, 5000); // retry instead of crashing
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected — attempting reconnect...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB runtime error: ${err.message}`);
});

module.exports = connectDB;
