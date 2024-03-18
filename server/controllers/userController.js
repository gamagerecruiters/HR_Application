import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder
import ErrorHandler from "../middlewares/error.js";
import mongoose from 'mongoose'; // Import Mongoose for ObjectId validation

// Delete user
export const deleteUserController = async (req, res, next) => {
  const { userId } = req.params; // Read the userId parameter
  try {
    // Find the user by id and delete that user from database
    const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });

    if (!deletedUser) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    res
      .status(200)
      .send({ message: "User deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};

// Retrieve all users
export const getAllUsersController = async (req, res, next) => {
  try {
    // Find all users
    const allUsers = await UserModel.find();

    if (!allUsers) {
      return res
        .status(404)
        .send({ message: "Users not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const usersOutput = allUsers.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        designation: user.designation,
        employmentType: user.employmentType,
      };
    });

    res.status(200).send({
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
    // validate
    if(!userId){
      throw new ErrorHandler(400, "Please provide all fields!")
    }
    // Find user by Id
    const user = await UserModel.find({ _id: userId });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = user.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        designation: user.designation,
        employmentType: user.employmentType,
      };
    });

    res.status(200).send({
      message: "User fetched successfully",
      success: true,
      user: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Designation
export const getFilteredUserByDesignationController = async (req, res, next) => {
  const { designation } = req.query;
  try {
    // validate
    if(!designation){
      throw new ErrorHandler(400, "Please provide all fields!")
    }
    // Find all users with the specified designation
    const users = await UserModel.find({designation : designation });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        designation: user.designation,
        employmentType: user.employmentType,
      };
    });

    res.status(200).send({
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
    if(!userType){
      throw new ErrorHandler(400, "Please provide all fields!")
    }
    // Find all users with the specified designation
    const users = await UserModel.find({userType : userType });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        designation: user.designation,
        employmentType: user.employmentType,
      };
    });

    res.status(200).send({
      message: `User filtered successfully based on User Type`,
      success: true,
      userList: userOutput,
    });
  } catch (error) {
    next(error);
  }
};


// Retrieve user by Employment Type
export const getFilteredUserByEmploymentTypeController = async (req, res, next) => {
  const { employmentType } = req.query;
  try {
    // validate
    if(!employmentType){
      throw new ErrorHandler(400, "Please provide all fields!")
    }
    // Find all users with the specified designation
    const users = await UserModel.find({employmentType : employmentType });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        designation: user.designation,
        employmentType: user.employmentType,
      };
    });

    res.status(200).send({
      message: "User filtered successfully based on Employment Type",
      success: true,
      userList: userOutput,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve user by Employment Type and Designation
export const getFilteredUserByEmploymentTypeAndDesignationController = async (req, res, next) => {
  const { employmentType , designation } = req.query; // Retrieve employmentType and  designation as query parameters
  try {
    // validate
    if(!employmentType || !designation){
      throw new ErrorHandler(400, "Please provide all fields!")
    }
    // Find all users with the specified designation
    const users = await UserModel.find({employmentType : employmentType , designation : designation });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    // Filter the required fields for the response. To prevent sending the password field to the response
    const userOutput = users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        designation: user.designation,
        employmentType: user.employmentType,
      };
    });

    res.status(200).send({
      message: "User filtered successfully based on Employment Type and Designation",
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
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId", success: false });
    }

    const user = await UserModel.findOne({ _id: userId });


    if (!user) {
      res.status(404).send({ message: "User Not Found", success: false });
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

    res.status(200).send({
      message: "User Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};




// Update user password controller to update user password After logged In to the system.
export const updateUserPasswordController = async (req, res, next) => {
  const { userId } = req.params;
  const { password } = req.body;

   // validate
   if (!password || !userId) {
    throw new Error("All fields are required");
  }


  // get req.user from validateToken middleware
  const loggedUser = req.user;

  try {
    // Check If  loggedUser not exists
    if (!loggedUser) {
      return res.status(401).send({ message: "Unauthorized access", success: false });
    }

    // const loggedUserEntity = await UserModel.findOne({ _id: loggedUser._id });

    // Check If  loggedUserEntity not exists
    if (!loggedUser) {
      return res.status(401).send({ message: "Unauthorized access", success: false });
    }

    if (loggedUser.userType !== "Admin"){
      if(userId != loggedUser._id){
        return res.status(401).send({ message: "Unauthorized login", success: false });
      }
    }
    

  

    const user = await UserModel.findOne({ _id: userId });


    if (!user) {
      return res.status(404).send({ message: "User Not Found", success: false });
    }

    
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      throw new Error("Set updated password. Don't set current password");
    }

    

    // Set the hashed password
    user.password = password;

    // user.password = password;

    await user.save();

    return res.status(200).send({
      message: "User Password Updated Successfully", 
      success: true,
    });
  } catch (error) {
    console.log(error)
    return next(error);
  }
};



