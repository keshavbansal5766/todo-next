import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(DB_URI, {
      dbName: "todoApp",
    });
  } catch (err) {
    console.log(err);
    console.log("Database not connected");
    process.exit(1);
  }
};
