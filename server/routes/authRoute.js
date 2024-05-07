import express from "express";
import {
  getUser,
  loginController,
  logoutController,
  registerController,
  forgetPasswordSendEmailController,
  resetPasswordController,
  verifyForgotPasswordLinkController,
  updateUserPasswordController
} from "../controllers/authController.js"; //* Import the loginController and registerController from the controllers folder
import { isAuthorized } from "../middlewares/auth.js"; //* Import the isAuthorized middleware from the middlewares folder


const authRoute = express.Router();

// POST || REGISTER /api-v1/auth/register
authRoute.post("/register", registerController); // Use authRoute instead of router

// POST || LOGIN /api-v1/auth/login
authRoute.post("/login", loginController); // Use authRoute instead of router

// GET || LOGOUT /api-v1/auth/logout
authRoute.get("/logout", isAuthorized, logoutController); // Use authRoute instead of router

// GET || GET USER /api-v1/auth/getUser
authRoute.get("/getUser", isAuthorized, getUser); // Use authRoute instead of router

// GET || GET verify the reset-password link /api-v1/auth/forgotpassword/:id/:token
authRoute.get("/forgotpassword/:id/:token",verifyForgotPasswordLinkController);


// POST || POST get password reset link to email  /api-v1/auth/sendPasswordLink/
authRoute.post("/sendPasswordLink/", forgetPasswordSendEmailController)

// POST || POST reset password /api-v1/auth//reset-password/:id/:token
authRoute.post("/reset-password/:id/:token", resetPasswordController )

// PUT || PUT update user password /api-v1/auth/update-user-password by Admin or  logged-in user is either the user whose password is being updated 
authRoute.put("/update-user-password/:userId", isAuthorized ,updateUserPasswordController)


export default authRoute;
