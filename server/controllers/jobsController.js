import ApplicationModel from "../models/application.model.js"; //* Import the ApplicationModel from the models folder
import mongoose from "mongoose"; //* Import mongoose
import moment from "moment";

//* === Create a job application ===
export const createJobController = async (req, res, next) => {
  const {
    jobTitle,
    location,
    experienceLevel,
    jobPosition,
    jobCategory,
    description,
    datePosted,
  } = req.body;
  try {
    if (
      !jobTitle ||
      !location ||
      !experienceLevel ||
      !jobPosition ||
      !jobCategory ||
      !description ||
      !datePosted
    ) {
      throw new Error("Please provide all fields");
    }

    req.body.createdBy = req.user._id; // Add the user id to the job application

    const job = await ApplicationModel.create(req.body);
    console.log(req.body);
    res.status(201).send({ job });
  } catch (error) {
    next(error);
  }
};

//* === Get all the jobs created by the user ===
export const getJobsController = async (req, res, next) => {
  try {
    const {
      jobTitle,
      experienceLevel,
      location,
      jobPosition,
      jobCategory,
      description,
      datePosted,
      search,
      sort,
    } = req.query;
    //condition to check if the user is filtering the jobs
    const queryObject = {
      createdBy: req.user._id,
    };
    //Logic to filter the jobs
    if (jobPosition && jobPosition !== "all") {
      queryObject.jobPosition = jobPosition;
    }
    if (jobCategory && jobCategory !== "all") {
      queryObject.jobCategory = jobCategory;
    }
    if (experienceLevel && experienceLevel !== "all") {
      queryObject.experienceLevel = experienceLevel;
    }
    if (location && location !== "all") {
      queryObject.location = location;
    }
    if (datePosted && datePosted !== "all") {
      queryObject.datePosted = datePosted;
    }
    if (search) {
      queryObject.jobPosition = { $regex: search, $options: "i" };
    }

    let queryResult = ApplicationModel.find(queryObject);

    //Logic to sort the jobs
    if (sort === "latest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("jobPosition");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-jobPosition");
    }

    //pagination logic
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    queryResult = queryResult.skip(skip).limit(limit);

    //Jobs count
    const totalJobs = await ApplicationModel.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    const jobs = await queryResult;
    // const jobs = await ApplicationModel.find({ createdBy: req.user._id }); // Find all the jobs created by the user
    res.status(200).send({ totalJobs, jobs, numOfPages });
  } catch (error) {
    next(error);
  }
};

//* === Update a job application ===
export const updateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      DOB,
      address,
      experienceLevel,
      jobPosition,
      jobCategory,
      resume,
      coverLetter,
    } = req.body;

    //find the job application by id and update the job application
    const job = await ApplicationModel.findOne({ _id: id });

    if (!job) {
      throw new Error("Job application not found");
    }
    if (!req.user._id === job.createdBy.toString()) {
      throw new Error("You are not authorized to update this job application");
    }
    const updateJob = await ApplicationModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({ updateJob });
  } catch (error) {
    next(error);
  }
};

//* === Delete a job application ===
export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await ApplicationModel.findOne({ _id: id });

    if (!job) {
      throw new Error(`Job application not found ${id}`);
    }
    if (!req.user._id === job.createdBy.toString()) {
      throw new Error("You are not authorized to delete this job application");
    }
    await ApplicationModel.findOneAndDelete();
    res.status(200).send({ message: "Success, Job Deleted!" });
  } catch (error) {
    next(error);
  }
};

//* === Get the job application statistics ===
export const jobStatsController = async (req, res) => {
  try {
    const stats = await ApplicationModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: "$jobPosition",
          count: { $sum: 1 },
        },
      },
    ]);

    //default stats
    const defaultStats = {
      jobCategory: stats.jobCategory || 0,
    };

    //monthly yearly stats
    let monthlyApplication = await ApplicationModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    monthlyApplication = monthlyApplication
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM YYYY");
        return { date, count };
      })
      .reverse();
    res
      .status(200)
      .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
  } catch (error) {
    next(error);
  }
};
