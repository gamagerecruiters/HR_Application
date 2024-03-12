import express from "express";
import {
  createJobController,
  deleteJobController,
  getJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js"; //* Import the createJobController and getJobsController from the controllers folder
import { sendToken } from "../middlewares/jwtValidation.js";
import reportGenerateController from "../controllers/reportGenerateController.js";

const router = express.Router();

//Routes
// CREATE JOB || POST /api-v1/job/create-job
router.post("/create-job", sendToken, createJobController);

// GET JOBS || GET /api-v1/job/get-job
router.get("/get-job", getJobsController);

// UPDATE JOB || PUT || PATCH /api-v1/job/update-job/:id
router.patch("/update-job/:id", updateJobController);

// DELETE JOB || DELETE /api-v1/job/delete-job/:id
router.delete("/delete-job/:id", deleteJobController);

// JOBS STATS || GET /api-v1/job/job-stats
router.get("/job-stats", jobStatsController);

// REPORT GENERATE || GET /api-v1/job/report
router.get("/report/:id", reportGenerateController);

router.get("/report", reportGenerateController);

export default router;
