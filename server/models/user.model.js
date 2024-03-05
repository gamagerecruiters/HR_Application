import mongoose from "mongoose";
import validator from "validator";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    phone: {
      type: Number,
      required: false,
    },
    location: {
      type: String,
      default: "Sri Lanka",
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving the user to the database
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare the password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// Generate a JWT token for the user
userSchema.methods.createJWT = function () {
  const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
