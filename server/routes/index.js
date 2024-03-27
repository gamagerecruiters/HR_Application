import express from "express";
import authRoute from "./authRoute.js"; //* Imported the authRoute from the routes folder
import userRoute from "./userRoute.js"; //* Imported the userRoute from the routes folder
import jobsRoute from "./jobsRoute.js"; //* Imported the jobsRoute from the routes folder
import applicationRoute from "./applicationRoute.js"; //* Imported the applicationRoute from the routes folder

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}user`, userRoute); //api-v1/user/
router.use(`${path}application`, applicationRoute); //api-v1/application/
router.use(`${path}job`, jobsRoute); //api-v1/job/


export default router;
