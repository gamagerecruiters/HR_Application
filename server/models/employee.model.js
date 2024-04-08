import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Nane is required"],
    },
    NICNumber: {
      type: String,
      required: [true, "NIC Number is required"],
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail, // Validate the email using validator package
    },
    jobPosition: {
      type: String,
      required: true,
    },
    jobCategory: {
        type: String,
        required: [true, "Job Category is required"],
        enum: [
          "Full-time",
          "Part-time",
          "Contract",
          "Internship",
          "Remote",
          "Other",
        ],
        default: "Full-time",
      },
    gender: {
      type: String,
      enum: ["Male", "Female"], // Only accept 'Admin' or 'User' values
      required: true,
    },
    phone: {
      type: Number,
      required: false,
    },
    
    company: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);



const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
