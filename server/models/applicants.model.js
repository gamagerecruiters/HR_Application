import mongoose from "mongoose";
import validator from "validator";

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [30, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
    minLength: [11, "Phone number must be at least 11 characters long"],
    maxLength: [11, "Phone number must be at most 11 characters long"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
    minLength: [5, "Address must be at least 5 characters long"],
    maxLength: [50, "Address must be at most 50 characters long"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter"],
    minLength: [50, "Cover letter must be at least 50 characters long"],
    maxLength: [500, "Cover letter must be at most 500 characters long"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userType: {
      type: String,
      enum: ["User"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userType: {
      type: String,
      enum: ["Admin"],
      required: true,
    },
  },
});

const ApplicantModel = mongoose.model("Applicant", applicantSchema);

export default ApplicantModel;
