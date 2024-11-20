import mongoose from "mongoose";

const url = "mongodb://localhost/ti-tools-back";

export const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Si jalo al 100 la DB");
  } catch (error) {
    console.error("No conecto tu chingadera", error.message);
    process.exit(1);
  }
};
