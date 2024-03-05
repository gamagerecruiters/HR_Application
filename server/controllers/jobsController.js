import ApplicationModel from "../models/application.model.js"; //* Import the ApplicationModel from the models folder

//* Create a job application
export const createJobController = async (req, res, next) => {
  const { DOB, address, experienceLevel, jobPosition, resume, coverLetter } =
    req.body;
  try {
    if (
      !DOB ||
      !address ||
      !experienceLevel ||
      !jobPosition ||
      !resume ||
      !coverLetter
    ) {
      throw new Error("Please provide all fields");
    }

    req.body.createdBy = req.user._id; // Add the user id to the job application

    const job = await ApplicationModel.create(req.body);
    res.status(201).send({ job });
  } catch (error) {
    next(error);
  }
};

// Get all the jobs created by the user
export const getJobsController = async (req, res, next) => {
  try {
    const jobs = await ApplicationModel.find({ createdBy: req.user._id }); // Find all the jobs created by the user
    res.status(200).send({ totalJobs: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};
