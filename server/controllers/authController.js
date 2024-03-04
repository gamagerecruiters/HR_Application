export const registerController = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    // validate
    if (!firstname || !lastname || !email) {
      return res
        .status(400)
        .send({ message: "All fields are required", success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ message: "Error in registerController", success: false, error });
  }
};
