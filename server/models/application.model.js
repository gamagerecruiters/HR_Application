import mongoose from "mongoose";
import validator from "validator";

// Application Schema for the database
const applicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail, // Validate the email using validator package
    },
    phone: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      default: "Sri Lanka",
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
