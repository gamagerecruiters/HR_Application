import express from "express";
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import {
  createJobController,
  getJobsController,
} from "../controllers/jobsController.js"; //* Import the createJobController and getJobsController from the controllers folder

const router = express.Router();

//Routes
// CREATE JOB || POST /api-v1/jobs
router.post("/create-job", validateToken, createJobController);

// GET JOBS || GET /api-v1/jobs
router.get("/get-job", validateToken, getJobsController);

export default router;
