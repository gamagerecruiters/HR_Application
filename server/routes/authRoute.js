import express from "express";
import jwt from "jsonwebtoken";
import router from ".";
import { registerController } from "../controllers/authController";

const authRoute = express.Router();

// POST /api-v1/auth/
router.post("/register", registerController);

export default router;
