import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder

export const addUserController = async (req, res, next) => {
  const { firstName, lastName, email, phone  } = req.body;
  try {
    if (!firstName || !lastName || !email || !phone) {
      // Check if all fields are provided
      throw new Error("Please provide all fields");
    }
    // dummyPassword needs to be saved in .env file
    const dummyPassword = "12345678";
    const userObj = {
      firstName, 
      lastName, 
      email, 
      phone,
      password : dummyPassword
    }
    const user = await UserModel.create(
      // Create user object and save it as document to the UserModel.
      userObj
    );
    
    const token = user.createJWT();
    res.status(201).send({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  // const {userId} = req.params;
  try{
    const deletedUser = await UserModel.findByIdAndDelete({_id : req.user._id});

    if(!deletedUser){
      return res.status(404).send({message : "User not found"})
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch(error){
    next(error)
  }
}


export const updateUserController = async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;
  try {
    if (!firstName || !lastName || !email || !phone) {
      // Check if all fields are provided
      throw new Error("Please provide all fields");
    }
    const user = await UserModel.findOneAndUpdate(
      // Find the user by id and update the user
      { _id: req.user._id },
      { firstName, lastName, email, phone },
      { new: true }
    );
    await user.save();
    const token = user.createJWT();
    res.status(200).send({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
