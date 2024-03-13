import express from "express";
import {adminLoginController} from "../controllers/adminController.js"
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder


const router = express.Router();

router.post("/admin-login", adminLoginController);







export default router;
