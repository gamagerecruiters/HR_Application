import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder

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
    // Find all users
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

// Retrieve user by Id
export const getFilteredUserByJobController = async (req, res, next) => {
  const { designation } = req.params;
  try {
    // Find all users
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

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phone, designation, employmentType } =
    req.body;
  try {
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

    const loggedUserEntity = await UserModel.findOne({ _id: loggedUser._id });

    // Check If  loggedUserEntity not exists
    if (!loggedUserEntity) {
      return res.status(401).send({ message: "Unauthorized access", success: false });
    }

    if(userId != loggedUserEntity._id){
      return res.status(401).send({ message: "Unauthorized login", success: false });
    }

  

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({ message: "User Not Found", success: false });
    }

    // Check if the new password is equal to the current password
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      throw new Error("Set updated password. Don't set current password");
    }



    user.password = password;

    // await user.hashPassword(password);
    await user.save();

    return res.status(200).send({
      message: "User Password Updated Successfully", 
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};



