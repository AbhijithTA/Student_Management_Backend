import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
