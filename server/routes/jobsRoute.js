import express from "express";
import {
  createJobController,
  deleteJobController,
  getJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js"; //* Import the createJobController and getJobsController from the controllers folder
import validateToken from "../middlewares/jwtValidation.js";
import reportGenerateController from "../controllers/reportGenerateController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *   Job:
 *    type: Object
 *    required:
 *     - jobTitle
 *     - location
 *     - experienceLevel
 *     - jobPosition
 *     - jobCategory
 *     - description
 *     - datePosted
 *    properties:
 *     jobTitle:
 *      type: string
 *      description: The title of the job
 *     location:
 *      type: string
 *      description: The location of the job
 *     experienceLevel:
 *      type: string
 *      enum:
 *       - "Beginner"
 *       - "Intermediate"
 *       - "Advanced"
 *      description: The experience level considered for the job
 *     jobPosition:
 *      type: string
 *      enum:
 *       - "SoftwareEngineer"
 *       - "QA Engineer"
 *       - "DevOps Engineer"
 *       - "Product Manager"
 *       - "Project Manager"
 *       - "Business Analyst"
 *       - "Data Analyst"
 *       - "Data Scientist"
 *       - "UX/UI Designer"
 *       - "Graphic Designer"
 *       - "Marketing Manager"
 *       - "Sales Manager"
 *       - "HR Manager"
 *       - "Finance Manager"
 *       - "Customer Support"
 *       - "Other"
 *      description: The job position of the candidate
 *     jobCategory:
 *      type: string
 *      enum:
 *       - "Full-time"
 *       - "Part-time"
 *       - "Contract"
 *       - "Internship"
 *       - "Remote"
 *       - "Other"
 *      description: The job category of the candidate
 *     description:
 *      type: string
 *      description: The description of the job
 *     datePosted:
 *      type: string
 *      format: date-time
 *      description: The date the job was posted
 */

/**
 * @swagger
 * /api-v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *      required: true
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: formData
 *         name: jobTitle
 *         type: string
 *       - in: formData
 *         name: location
 *         type: string
 *       - in: formData
 *         name: experienceLevel
 *         type: string
 *       - in: formData
 *         name: description
 *         type: string
 *       - in: formData
 *         name: jobPosition
 *         type: string
 *       - in: formData
 *         name: jobCategory
 *         type: string
 *       - in: formData
 *         name: datePosted
 *         type: string
 *         format: date-time
 *     responses:
 *       200:
 *         description: The job was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth:
 *     responses:
 *       200:
 *         description: The list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized
 *
 * /update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The updated job
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The deleted job ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Job deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *
 * /job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The job statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: number
 *                 totalCandidates:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */

//Routes
// CREATE JOB || POST /api-v1/job/create-job
router.post("/create-job", validateToken, createJobController);

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
