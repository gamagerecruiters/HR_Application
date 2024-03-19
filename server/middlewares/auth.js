import JWT from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  // console.log(req.cookies)
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(400, "User not authorized!"));
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await UserModel.findById(decoded._id);

  next();
});
