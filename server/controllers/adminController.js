// Imported the UserModel from the models folder
import UserModel from "../models/user.model.js";

export const adminLoginController = async (req, res, next) => {
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

    if(existingUser.userType != "Admin"){
        throw new Error("Unpriviledges Access");
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


