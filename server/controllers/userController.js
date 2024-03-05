import UserModel from "../models/user.model.js"; //* Import the UserModel from the models folder

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
