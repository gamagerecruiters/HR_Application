import express from "express";
import { sendToken } from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import {isAuthorized} from "../middlewares/auth.js"
import {
  updateUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  getFilteredUserByDesignationController,
  getFilteredUserByEmploymentTypeAndDesignationController,
  getFilteredUserByEmploymentTypeController,
  getFilteredUserByUserTypeController,
  updateUserPasswordController,
} from "../controllers/userController.js"; //* Import the updateUserController from the controllers folder
// import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder


const router = express.Router();

//Routes
// GET USERS || GET /api-v1/user
router.get("/get-all-users", getAllUsersController);

router.get("/get-user/:userId", getUserController);

router.get("/get-user-by-userType", getFilteredUserByUserTypeController);

router.get("/get-user-by-designation", getFilteredUserByDesignationController);

router.get("/get-user-by-employmentType", getFilteredUserByEmploymentTypeController);

router.get("/get-user-by-employmentType-designation", getFilteredUserByEmploymentTypeAndDesignationController)




// CREATE USERS || POST /api-v1/add-user

// router.post("/add-user", validateToken, addUserController);
// router.post("/add-user", validateToken , addUserController);

// UPDATE USERS || PATCH /api-v1/user/:id
router.patch("/update-user/:userId", updateUserController);

router.put("/update-user-password/:userId", isAuthorized ,updateUserPasswordController);

// UPDATE USER STATUS || PATCH /api-v1/update-user/:userId
// router.patch(
//   "/update-user-status/:userId",
//   updateStatusController
// );

// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user/:userId", deleteUserController);
router.patch("/update-user/:userId", sendToken, updateUserController);

// UPDATE USER STATUS || PATCH /api-v1/update-user/:userId

// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user/:userId", sendToken, deleteUserController);

export default router;
