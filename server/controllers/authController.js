// Imported the UserModel from the models folder
import UserModel from "../models/user.model.js";

export const registerController = async (req, res, next) => {
  const { firstName, lastName, email, password, Designation, employmentType } = req.body;
  try {
    // validate
    if (!firstName || !lastName || !email || !password || !Designation || !employmentType) {
      throw new Error("All fields are required");
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create a new user if the user does not exist
    const newUser = await UserModel({
      firstName,
      lastName,
      email,
      password,
      Designation,
      employmentType
    });
    await newUser.save(); // Save the user to the database
    const token = newUser.createJWT(); // Generate a token for the user
    
    
    res.status(201).send({
      message: "User created successfully",
      success: true,
      newUser,
      token,
    });
  } catch (error) {
    next(error); // Pass error to error middleware
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // validate
    if (!email || !password) {
      throw new Error("Please provide all fields");
    }

    // Check if the user exists
    const existingUser = await UserModel.findOne({ email }).select("+password");
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    // Check if the password is correct
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    existingUser.password = undefined; // Remove the password from the user object
    const token = existingUser.createJWT(); // Generate a token for the user
    res.status(200).send({
      message: "User logged in successfully",
      success: true,
      existingUser,
      token,
    });
  } catch (error) {
    next(error); // Pass error to error middleware
  }
};
