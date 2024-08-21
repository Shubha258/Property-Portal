import mongoose from "mongoose";
// PORT = 8000;

const MONGO_URL =
  "mongodb+srv://Shubham:Shubham123%40@cluster0.twu7epp.mongodb.net/";
const connectDB = async () => {
  console.log(MONGO_URL);
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`connected to database ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in connection ${error}`);
  }
};

export default connectDB;
