import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder
import ErrorHandler from "../middlewares/error.js";
import mongoose from "mongoose"; // Import Mongoose for ObjectId validation
import { showUserOutput } from "../helpers/extractUserDetails.js";
import {
  isAuthorizedAdminAccess,
  isAuthorizedUserAccess,
} from "../services/authService.js";
import fs from "fs";
import path from "path";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Delete user
export const deleteUserController = async (req, res, next) => {
  const { userId } = req.params; // Read the userId parameter
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }


    // Find the user by id and delete that user from database
    const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};

// Retrieve all users
export const getAllUsersController = async (req, res, next) => {
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Find all users
    const allUsers = await UserModel.find();

    if (!allUsers || allUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "Users not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const usersOutput = allUsers.map((user) => {
      return showUserOutput(user);
    });

    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      users: usersOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Id
export const getUserController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Verify the user access
    if (!isAuthorizedUserAccess(req.user)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // validate
    if (!userId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    // if(!(isAuthorizedAdminAccess(req.user, req.isAdmin)) && (req.user._id !== userId)){
    //   throw new ErrorHandler(401, "Unauthorized Access");
    // }

    
    // Find user by Id
    const user = await UserModel.find({ _id: userId });

    // If user not exist 
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = user.map((user) => {
      return showUserOutput(user);
    });

    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Designation
export const getFilteredUserByDesignationController = async (
  req,
  res,
  next
) => {
  const { designation } = req.query;
  try {
    // validate
    if (!designation) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }
    // Find all users with the specified designation
    const users = await UserModel.find({ designation: designation });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return showUserOutput(user);
    });

    res.status(200).json({
      message: "User filtered successfully based on Designation",
      success: true,
      userList: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Designation
export const getFilteredUserByUserTypeController = async (req, res, next) => {
  const { userType } = req.query;
  try {
    // validate
    if (!userType) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }
    // Find all users with the specified designation
    const users = await UserModel.find({ userType: userType });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return showUserOutput(user);
    });

    res.status(200).json({
      message: `User filtered successfully based on User Type`,
      success: true,
      userList: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Employment Type
export const getFilteredUserByEmploymentTypeController = async (
  req,
  res,
  next
) => {
  const { employmentType } = req.query;
  try {
    // validate
    if (!employmentType) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }
    // Find all users with the specified designation
    const users = await UserModel.find({ employmentType: employmentType });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return showUserOutput(user);
    });

    res.status(200).json({
      message: "User filtered successfully based on Employment Type",
      success: true,
      userList: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Employment Type and Designation
export const getFilteredUserByEmploymentTypeAndDesignationController = async (
  req,
  res,
  next
) => {
  const { employmentType, designation } = req.query; // Retrieve employmentType and  designation as query parameters
  try {
    // validate
    if (!employmentType || !designation) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }
    // Find all users with the specified designation
    const users = await UserModel.find({
      employmentType: employmentType,
      designation: designation,
    });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return showUserOutput(user);
    });

    res.status(200).json({
      message:
        "User filtered successfully based on Employment Type and Designation",
      success: true,
      userList: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phone, designation, employmentType } =
    req.body;
  try {
    // console.log(req.user, isAuthorizedUserAccess(req.user))
    
    //Verify the user access
    if (!isAuthorizedUserAccess(req.user)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // validate
    if (!userId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    if(!(isAuthorizedAdminAccess(req.user, req.isAdmin)) && (String(req.user._id) !== userId)){
      throw new ErrorHandler(401, "Unauthorized Access");
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User Not Found", success: false });
    }

    // It checks the properties of request body object has value and If it has value then only assign the new value to the user in the database
    // Otherwise It exists with previous value
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (designation) user.designation = designation;
    if (employmentType) user.employmentType = employmentType;

    await user.save();

    res.status(200).json({
      message: "User Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Update user status controller function
export const updateUserStatusController = async (req, res, next) => {
  const { userId } = req.params;
  const { status } = req.body;

 
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ message: "User Not Found", success: false });
    }

    if (!status) {
      throw new Error("All fields are required");
    }

    if (status) user.status = status;
    await user.save();

    return res.status(200).send({
      message: "User Status Updated Successfully", 
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

//Generate user report by Admin
export const generateUserReport = async (req, res, next) => {
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    const users = await UserModel.find({});

    if (!users.length) {
      return res.status(404).send("No users found");
    }

    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Users Report in Gamage Recruiters PVT LTD ";
    const headers = [
      [
        "",
        "ID",
        "Full Name",
        "Email",
        "Designation",
        "Employment Type",
        "User Type",
        "Status",
        "Phone",
      ],
    ];

    const userData = users.map((user,index) => [
      ++index,
      user._id,
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.designation,
      user.employmentType,
      user.userType,
      user.status,
      user.phone || "",
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: userData,
      styles: {
        font: "helvetica",
        textColor: [0, 0, 0],
        setFontSize: 15,
        overflow: "linebreak",
      },
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246] }, // Changing background color of the header
      cellPadding: 5, // Adding padding to cells

    };

    function centerText(doc, text, y) {
      const textWidth =
        (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, textOffset, y);
    }

    doc.setFontSize(15);
    centerText(doc, title, 20);
    doc.autoTable(content);

    // Save the PDF to a buffer
    const pdfBuffer = doc.output("arraybuffer");

    // Save the PDF to a file
    const filePath = path.join(__dirname, "../docs", "User-Report.pdf");
    fs.writeFileSync(filePath, Buffer.from(pdfBuffer));

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=User-Report.pdf"
    );

    // Send the PDF buffer as the response
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    return next(error);

  }
};







