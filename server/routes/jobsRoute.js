import express from "express";
import { isAuthorized } from "../middlewares/auth.js";
import {
  createJobController,
  deleteJobController,
  getJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js"; //* Import the createJobController and getJobsController from the controllers folder
import reportGenerateController from "../controllers/reportGenerateController.js";

const router = express.Router();

//Routes
// CREATE JOB || POST /api-v1/job/create-job
router.post("/create-job", isAuthorized, createJobController);

// GET JOBS || GET /api-v1/job/get-job
router.get("/getAll", getJobsController);

// UPDATE JOB || PUT || PATCH /api-v1/job/update-job/:id
router.patch("/update-job/:id", isAuthorized, updateJobController);

// DELETE JOB || DELETE /api-v1/job/delete-job/:id
router.delete("/delete-job/:id", isAuthorized, deleteJobController);

// JOBS STATS || GET /api-v1/job/job-stats
router.get("/job-stats", jobStatsController);

// REPORT GENERATE || GET /api-v1/job/report
router.get("/report/:id", reportGenerateController);

router.get("/report", reportGenerateController);

export default router;
