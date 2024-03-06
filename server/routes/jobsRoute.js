import express from "express";
import validateToken from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import {
  createJobController,
  deleteJobController,
  getJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js"; //* Import the createJobController and getJobsController from the controllers folder

const router = express.Router();

//Routes
// CREATE JOB || POST /api-v1/job/create-job
router.post("/create-job", validateToken, createJobController);

// GET JOBS || GET /api-v1/job/get-job
router.get("/get-job", validateToken, getJobsController);

// UPDATE JOB || PUT || PATCH /api-v1/job/update-job/:id
router.patch("/update-job/:id", validateToken, updateJobController);

// DELETE JOB || DELETE /api-v1/job/delete-job/:id
router.delete("/delete-job/:id", validateToken, deleteJobController);

// JOBS STATS || GET /api-v1/job/job-stats
router.get("/job-stats", validateToken, jobStatsController);

export default router;
