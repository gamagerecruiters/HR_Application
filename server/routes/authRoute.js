import express from "express";
import { isAuthorized } from "../middlewares/auth.js"; //* Import the isAuthorized middleware from the middlewares folder
import {
  getUser,
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController.js"; //* Import the loginController and registerController from the controllers folder
import { forgetPasswordSendEmailController, resetPasswordController, verifyForgotPasswordLinkController } from "../controllers/userController.js";

const authRoute = express.Router();

// POST || REGISTER /api-v1/auth/register
authRoute.post("/register", registerController); // Use authRoute instead of router

// POST || LOGIN /api-v1/auth/login
authRoute.post("/login", loginController); // Use authRoute instead of router

// GET || LOGOUT /api-v1/auth/logout
authRoute.get("/logout", isAuthorized, logoutController); // Use authRoute instead of router

// GET || GET USER /api-v1/auth/getUser
authRoute.get("/getUser", isAuthorized, getUser); // Use authRoute instead of router

authRoute.get("/forgotpassword/:id/:token",verifyForgotPasswordLinkController);

authRoute.post("/sendPasswordLink/", forgetPasswordSendEmailController)

authRoute.post("/reset-password/:id/:token", resetPasswordController )

export default authRoute;
