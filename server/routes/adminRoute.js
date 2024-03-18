import express from "express";
import {adminLoginController,updateStatusController } from "../controllers/adminController.js"
// import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import { sendToken } from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder


const router = express.Router();

router.post("/admin-login", adminLoginController);
router.patch("/update-user-status/:userId", sendToken, updateStatusController);








export default router;
