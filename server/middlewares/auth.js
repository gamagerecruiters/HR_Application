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

  if(req.user){
    req.isAdmin = req.user.userType === "Admin" ? true : false
    req.isSuperAdmin = req.user.userType === "SuperAdmin" ? true : false
  }

  next();
});


// export const isAdmin = catchAsyncError(async (req, res, next) => {
//   const authorizedUser = req.user

//   if (!authorizedUser) {
//     return next(new ErrorHandler(400, "User not authorized!"));
//   }

//   if(authorizedUser.userType != "Admin"){
//     return next(new ErrorHandler(401, "User not Authorized"))
//   }

//   req.admin = true

//   next();
// });
