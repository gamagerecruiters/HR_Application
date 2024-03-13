import JWT from "jsonwebtoken";
import UserModel from "../models/user.model";
import { catchAsyncError } from "./catchAsyncError";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User not authorized!", 400));
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decoded.id);

  next();
});
