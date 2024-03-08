import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder

export const deleteUserController = async (req, res, next) => {
  const { userId } = req.params;
  try {
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



export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phone, designation, employmentType } =
    req.body;
  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user){
      res.status(404).send({message : "User Not Found", success : false})
    }

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    if (phone) user.phone = phone
    if (designation) user.Designation = designation
    if (employmentType) user.employmentType = employmentType
    
    await user.save();
    const token = user.createJWT();
    res.status(200).send({
      message : "User Updated Successfully",
      success : true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
