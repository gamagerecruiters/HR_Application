import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js"; //* Import the loginController and registerController from the controllers folder

const authRoute = express.Router();

// POST || REGISTER /api-v1/auth/register
authRoute.post("/register", registerController); // Use authRoute instead of router

// POST || LOGIN /api-v1/auth/login
authRoute.post("/login", loginController); // Use authRoute instead of router

export default authRoute;
