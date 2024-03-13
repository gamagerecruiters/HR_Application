import express from "express";
<<<<<<< HEAD
=======
import { sendToken } from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
>>>>>>> e94642cd026f0b3daf773d9f4e8f6e3afb63426e
import {
  updateUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  updateStatusController,
<<<<<<< HEAD
  updateUserPasswordController,
} from "../controllers/userController.js"; //* Import the updateUserController from the controllers folder
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder

=======
} from "../controllers/userController.js"; //* Import the updateUserController from the controllers folder
>>>>>>> e94642cd026f0b3daf773d9f4e8f6e3afb63426e

const router = express.Router();

//Routes
// GET USERS || GET /api-v1/user
router.get("/get-all-users", getAllUsersController);

router.get("/get-user/:userId", getUserController);

// CREATE USERS || POST /api-v1/add-user

// router.post("/add-user", validateToken, addUserController);
// router.post("/add-user", validateToken , addUserController);

// UPDATE USERS || PATCH /api-v1/user/:id
<<<<<<< HEAD
router.patch("/update-user/:userId", validateToken, updateUserController);

router.put("/update-user-password/:userId", validateToken, updateUserPasswordController);

// UPDATE USER STATUS || PATCH /api-v1/update-user/:userId
router.patch(
  "/update-user-status/:userId",
  validateToken,
  updateStatusController
);

// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user/:userId", validateToken, deleteUserController);
=======
router.patch("/update-user/:userId", sendToken, updateUserController);

// UPDATE USER STATUS || PATCH /api-v1/update-user/:userId
router.patch("/update-user-status/:userId", sendToken, updateStatusController);

// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user/:userId", sendToken, deleteUserController);
>>>>>>> e94642cd026f0b3daf773d9f4e8f6e3afb63426e

export default router;
