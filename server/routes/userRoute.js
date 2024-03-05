import express from "express";
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import { updateUserController } from "../controllers/userController.js"; //* Import the updateUserController from the controllers folder

const router = express.Router();

//Routes
// GET USERS || GET /api-v1/user
// router.get("/get-users", getUsersController);

// UPDATE USERS || PUT /api-v1/user/:id
router.put("/update-user", validateToken, updateUserController);

// DELETE USERS || DELETE /api-v1/user/:id

export default router;
