import shortid from "shortid";
import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// Application Schema for the database
const applicationSchema = new mongoose.Schema(
  {
    _id: { type: String, default: shortid.generate },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: [true, "Please provide a location for the job"],
      maxlength: 50,
    },
    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    jobPosition: {
      type: String,
      required: [true, "Job Position is required"],
      enum: [
        "Software Engineer",
        "QA Engineer",
        "DevOps Engineer",
        "Product Manager",
        "Project Manager",
        "Business Analyst",
        "Data Analyst",
        "Data Scientist",
        "UX/UI Designer",
        "Graphic Designer",
        "Marketing Manager",
        "Sales Manager",
        "HR Manager",
        "Finance Manager",
        "Customer Support",
        "Other",
      ],
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
    description: {
      type: String,
      required: [, "Please provide a job description"],
      minLength: [5, "Job description must be at least 5 characters long"],
      maxLength: [1000, "Job description must not exceed 350 characters"],
    },
    expired: {
      type: Boolean,
      default: false,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user to the database
// applicationSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// Compare the password with the hashed password in the database
// applicationSchema.methods.comparePassword = async function (password) {
//   const isMatch = await bcrypt.compare(password, this.password);
//   return isMatch;
// };
// Generate a JWT token for the user
// applicationSchema.methods.getJWTToken = function () {
//   const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "1d",
//   });
//   return token;
// };
const ApplicationModel = mongoose.model("Application", applicationSchema);

export default ApplicationModel;
