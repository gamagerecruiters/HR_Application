// Imported the UserModel from the models folder
import UserModel from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../middlewares/jwtValidation.js";

export const registerController = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    designation,
    employmentType,
    userType,
  } = req.body;
  try {
    // validate
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !designation ||
      !employmentType ||
      !userType
    ) {
      return next(new ErrorHandler(400, "Please provide all fields!"));
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler(400, "Email is already taken!"));
    }

    // Create a new user if the user does not exist
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password,
      designation,
      employmentType,
      userType,
    });
    await newUser.save(); // Save the user to the database

    sendToken(newUser, 200, res, "User registered successfully!"); // Send the token to the user
  } catch (error) {
    next(error); // Pass error to error middleware
  }
});

export const loginController = async (req, res, next) => {
  const { email, password, userType } = req.body;
  try {
    // validate
    if (!email || !password || !userType) {
      return next(new ErrorHandler(400, "Please provide all fields!"));
    }

    // Check if the user exists
    const existingUser = await UserModel.findOne({ email }).select("+password");
    if (!existingUser) {
      return next(new ErrorHandler(400, "Invalid email or password!"));
    }

    // Check if the password is correct
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler(400, "Invalid email or password!"));
    }

    if (existingUser.userType !== userType) {
      return next(new ErrorHandler(400, "Invalid user type!"));
    }

    sendToken(existingUser, 200, res, "User logged in successfully!"); // Send the token to the user
  } catch (error) {
    next(error); // Pass error to error middleware
  }
};

export const logoutController = async (req, res, next) => {
  res
    .status(201)
    .cookie("token", null, "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
};
