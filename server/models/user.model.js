import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    designation: {
      type: String,
      required: false,
    },
    employmentType: {
      type: String,
      enum: ["Intern", "Contract-Basis", "Permanent"], // Only accept 'Intern' or 'Contract-Basis' or 'Permanent' values
      default: "Intern",
    },
    userType: {
      type: String,
      enum: ["Admin", "User"], // Only accept 'Admin' or 'User' values
      default: "User",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"], // Only accept 'Active' or 'Inactive' values
      default: "Active",
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    company : {
      type : String,
      default : "Gamage Recruiters (Pvt) Ltd",
      required : false
    },
    verifytoken:{
      type: String,
      required : false
  },
    // Google Authentication part
    googleId: {
      type: String,
      unique: true,
      sparse: true,
      required: false,
    },
    displayName: String,
    image: String,
  },
  { timestamps: true }
);

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  console.log(this.password)
  this.password = await bcrypt.hash(this.password, salt);
  next()
});



// Compare the password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// Generate a JWT token for the user
userSchema.methods.getJWTToken = function () {
  const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
