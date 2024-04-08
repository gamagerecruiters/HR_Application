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
  updateUserStatusController, 
  generateUserReport
} from "../controllers/userController.js"; //* Import the needed user controller functions from the controllers folder


const userRouter = express.Router();

//Routes
// GET all users || GET /api-v1/get-all-users
userRouter.get("/get-all-users", isAuthorized ,getAllUsersController);  // Access - Admin

// GET users by userId || GET /api-v1/get-user/:userId
userRouter.get("/get-user/:userId", isAuthorized ,getUserController); // Access - User , Admin

// GET users by userType || GET /api-v1/get-user-by-userType    //  Query Parameters Used
userRouter.get("/get-user-by-userType", isAuthorized ,getFilteredUserByUserTypeController);

// GET all user by designation || GET /api-v1/get-user-by-designation  //  Query Parameters Used
userRouter.get("/get-user-by-designation", isAuthorized ,getFilteredUserByDesignationController);

// GET all user by employmentType || GET /api-v1/get-user-by-employmentType  //  Query Parameters Used
userRouter.get("/get-user-by-employmentType", isAuthorized ,getFilteredUserByEmploymentTypeController);

// GET all user by employmentType and designation || GET /api-v1/get-user-by-employmentType-designation  //  Query Parameters Used
userRouter.get("/get-user-by-employmentType-designation", isAuthorized ,getFilteredUserByEmploymentTypeAndDesignationController)

// GET generate user report || GET /api-v1/generate-report
userRouter.get("/generate-user-report", isAuthorized ,generateUserReport)

// UPDATE USERS || PATCH /api-v1/update-user/:userId
userRouter.patch("/update-user/:userId", isAuthorized ,updateUserController);

//UPDATE update-user-status  || PUT /api-v1/update-user-status/:userId
userRouter.put("/update-user-status/:userId", isAuthorized ,updateUserStatusController);

// DELETE USERS || DELETE /api-v1/delete-user/:userId
userRouter.delete("/delete-user/:userId", isAuthorized ,deleteUserController);






export default userRouter;
