import express from "express";
import authRoute from "./authRoute.js"; //* Imported the authRoute from the routes folder
import userRoute from "./userRoute.js"; //* Imported the userRoute from the routes folder
import jobsRoute from "./jobsRoute.js"; //* Imported the jobsRoute from the routes folder
<<<<<<< HEAD
import adminRoute from "./adminRoute.js"; //* Imported the adminRoute from the routes folder
=======
import applicationRoute from "./applicationRoute.js"; //* Imported the applicationRoute from the routes folder
>>>>>>> e94642cd026f0b3daf773d9f4e8f6e3afb63426e

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute); //api-v1/auth/
router.use(`${path}user`, userRoute); //api-v1/user/
router.use(`${path}application`, applicationRoute); //api-v1/application/
router.use(`${path}job`, jobsRoute); //api-v1/job/
router.use(`${path}admin`, adminRoute); //api-v1/admin/


export default router;
