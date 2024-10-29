import mongoose from "mongoose";

const url =
  "mongodb+srv://soporteti:Us1PyGa2KSLOvYyZ@clustertitools.ronju.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTITOOLS";

export const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Si jalo al 100 la DB");
  } catch (error) {
    console.error("No conecto tu chingadera", error.message);
    process.exit(1);
  }
};
