import mongoose from "mongoose";
import JWT from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// Application Schema for the database
const applicationSchema = new mongoose.Schema(
  {
    DOB: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 50,
    },
    experienceLevel: {
      type: String,
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
      required: true,
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
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
applicationSchema.methods.createJWT = function () {
  const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};
const ApplicationModel = mongoose.model("Application", applicationSchema);

export default ApplicationModel;
