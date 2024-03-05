import mongoose from "mongoose";
import JWT from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// Application Schema for the database
const applicationSchema = new mongoose.Schema(
  {
    experienceLevel: {
      type: String,
      required: false,
    },
    jobPosition: {
      type: String,
      required: false,
    },
    jobCategory: {
      type: String,
      required: false,
    },
    postDate: {
      type: Date,
      default: Date.now,
    },
    resume: {
      type: String,
      required: false,
    },
    coverLetter: {
      type: String,
      required: false,
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
