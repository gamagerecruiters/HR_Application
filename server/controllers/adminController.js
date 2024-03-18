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


export const updateStatusController = async (req, res, next) => {
  const { userId } = req.params;
  const { status } = req.body;

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

    // Check If logged User type is Not admin
    if (loggedUserEntity.userType != "Admin") {
      return res
        .status(401)
        .send({ message: "Admin staff only access", success: false });
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




