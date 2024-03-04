import mongoose from "mongoose";

const dbConnection = async () => {
  const dbUri = process.env.MONGODB_URL;
  if (!dbUri) {
    console.error("MongoDB connection string is missing!");
    process.exit(1);
  }
  
  try {
    await mongoose.connect(dbUri);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};

export default dbConnection;
