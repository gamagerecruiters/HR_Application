import express from "express";
import {
  adminGetAllApplications,
  userDeleteApplication,
  userGetAllApplications,
} from "../controllers/applicantController.js";
import { sendToken } from "../middlewares/jwtValidation.js";

const applicationRoute = express.Router();

//Routes
applicationRoute.get("/user-getAll", sendToken, userGetAllApplications);
applicationRoute.get("/admin-getAll", sendToken, adminGetAllApplications);
applicationRoute.delete(
  "/user-delete-application/:id",
  sendToken,
  userDeleteApplication
);

export default applicationRoute;
