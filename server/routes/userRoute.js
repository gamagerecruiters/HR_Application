import express from "express";
import { sendToken } from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import {isAuthorized} from "../middlewares/auth.js" //* Import the Authorization middleware from the middlewares folder
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
} from "../controllers/userController.js"; //* Import the needed user controller functions from the controllers folder


const router = express.Router();

//Routes
// GET USERS || GET /api-v1/user
router.get("/get-all-users", isAuthorized ,getAllUsersController);  // Access - Admin

router.get("/get-user/:userId", isAuthorized ,getUserController); // Access - User , Admin

router.get("/get-user-by-userType", isAuthorized ,getFilteredUserByUserTypeController);

router.get("/get-user-by-designation", isAuthorized ,getFilteredUserByDesignationController);

router.get("/get-user-by-employmentType", isAuthorized ,getFilteredUserByEmploymentTypeController);

router.get("/get-user-by-employmentType-designation", isAuthorized ,getFilteredUserByEmploymentTypeAndDesignationController)


// UPDATE USERS || PATCH /api-v1/user/:id
router.patch("/update-user/:userId", isAuthorized ,updateUserController);

router.put("/update-user-password/:userId", isAuthorized ,updateUserPasswordController);


// DELETE USERS || DELETE /api-v1/user/:id
router.delete("/delete-user/:userId", isAuthorized ,deleteUserController);




export default router;
