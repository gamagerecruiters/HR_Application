// Imported the UserModel from the models folder
import UserModel from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../middlewares/jwtValidation.js";
import { sendForgetPasswordLinkByEmail } from "../utils/mailer.js";
import jwt from "jsonwebtoken";
import {showUserOutput} from "../helpers/extractUserDetails.js"
import {
  isAuthorizedUserAccess,
  isAuthorizedAdminAccess
} from "../services/authService.js"

export const registerController = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
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

    const newUserObject = {
      firstName,
      lastName,
      email,
      password,
      designation,
      employmentType,
      userType,
    };

    // Add phone if it has a value
    if (phone) {
      newUserObject.phone = phone;
    }



    // Create a new user if the user does not exist
    const newUser = new UserModel(newUserObject);
    await newUser.save(); // Save the user to the database


    sendToken(newUser, 200, res, "User registered successfully!"); // Send the token to the user
  } catch (error) {
    next(error); // Pass error to error middleware
  }
});

export const loginController = catchAsyncError(async (req, res, next) => {
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

    // check user status is Active or Inactive
    if (existingUser.status == "Inactive"){
      return next(new ErrorHandler(400, "User is inactive "));
    }



    sendToken(existingUser, 200, res, "User logged in successfully!"); // Send the token to the user
  } catch (error) {
    next(error); // Pass error to error middleware
  }
});

export const logoutController = catchAsyncError(async (req, res, next) => {
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
});

// Update user password controller to update user password After logged In to the system.
export const updateUserPasswordController = async (req, res, next) => {
  const { userId } = req.params;
  const { password } = req.body;

  // validate
  if (!password || !userId) {
    throw new Error("All fields are required");
  }


  try {
    // Verify if the logged-in user is authorized (either the user or an admin)
    if (!isAuthorizedUserAccess(req.user) && !isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Ensure that the logged-in user is updating their own password
    if (req.user._id.toString() !== userId && !req.isAdmin) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only update your own password or Contact Admin", success: false });
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      throw new Error("Set updated password. Don't set current password");
    }

    // Set the hashed password
    user.password = password;

    // user.password = password;

    await user.save();

    return res.status(200).json({
      message: "User Password Updated Successfully",
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

// Send email for reset-password due to the forgot password
export const forgetPasswordSendEmailController = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await UserModel.findOne({ email: email });

    if (!userfind) {
      return res.status(404).json({ status: 404, message: "Invaild  Email" });
    }

    const expiresIn = 600;

    // token generate for reset password
    const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: expiresIn,
    });

    const setusertoken = await UserModel.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    )
    
    if (setusertoken) {
      sendForgetPasswordLinkByEmail(userfind, setusertoken, res);
    }
  } catch (error) {
    next(error);
  }
};

// Verify the id and token in the reset-password link
export const verifyForgotPasswordLinkController = async (req, res, next) => {
  const { id, token } = req.params;

  try {
    const validuser = await UserModel.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("verify token", verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    next(error);
  }
};

// change password
export const resetPasswordController = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    if (!id || !token || !password) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    const validuser = await UserModel.findOne({ _id: id, verifytoken: token });

    if (!validuser) {
      return res.status(401).json({ status: 401, message: "user not exist" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid or Expired token" });
    }

    validuser.password = password;
    validuser.verifytoken = undefined;

    await validuser.save();

    res.status(201).json({ status: 201, validuser });
  } catch (error) {
    next(error);
  }
};

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    userResult: showUserOutput(user),
  });
});
