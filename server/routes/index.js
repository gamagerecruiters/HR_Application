import express from "express";
import authRoute from "./authRoute.js"; //* Imported the authRoute from the routes folder
import userRoute from "./userRoute.js"; //* Imported the userRoute from the routes folder
import jobsRoute from "./jobsRoute.js"; //* Imported the jobsRoute from the routes folder
import applicationRoute from "./applicationRoute.js"; //* Imported the applicationRoute from the routes folder
import employeeRouter from "./employeeRoute.js";
import leaveRouter from "./leaveRoute.js";

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}user`, userRoute); //api-v1/user/
router.use(`${path}application`, applicationRoute); //api-v1/application/
router.use(`${path}job`, jobsRoute); //api-v1/job/
router.use(`${path}employee`, employeeRouter); //api-v1/employee/
router.use(`${path}leave`, leaveRouter); //api-v1/leave/




export default router;
