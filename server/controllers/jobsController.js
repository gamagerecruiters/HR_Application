import moment from "moment";
import mongoose from "mongoose"; //* Import mongoose
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ApplicationModel from "../models/application.model.js"; //* Import the ApplicationModel from the models folder

//* === Create a job application ===
export const createJobController = catchAsyncError(async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "User") {
    return next(
      new ErrorHandler(
        400,
        "You are not authorized to create a job application"
      )
    );
  }

  const {
    jobTitle,
    location,
    experienceLevel,
    jobPosition,
    jobCategory,
    description,
  } = req.body;

  if (
    !jobTitle ||
    !location ||
    !experienceLevel ||
    !jobPosition ||
    !jobCategory ||
    !description
  ) {
    return next(new ErrorHandler(400, "Please provide all fields"));
  }

  const postedBy = req.user._id;
  const job = await ApplicationModel.create({ ...req.body, postedBy });
  res.status(200).json({
    success: true,
    message: "Job application created successfully",
    job,
  });

  // const {
  //   jobTitle,
  //   location,
  //   experienceLevel,
  //   jobPosition,
  //   jobCategory,
  //   description,
  //   datePosted,
  // } = req.body;
  // try {
  //   if (
  //     !jobTitle ||
  //     !location ||
  //     !experienceLevel ||
  //     !jobPosition ||
  //     !jobCategory ||
  //     !description ||
  //     !datePosted
  //   ) {
  //     throw new Error("Please provide all fields");
  //   }

  //   req.body.createdBy = req.user._id; // Add the user id to the job application

  //   const job = await ApplicationModel.create(req.body);
  //   console.log(req.body);
  //   res.status(201).send({ job });
  // } catch (error) {
  //   next(error);
  // }
});

//* === Get all the jobs created by the user ===
export const getJobsController = catchAsyncError(async (req, res, next) => {
  // try {
  // const {
  //   jobTitle,
  //   experienceLevel,
  //   location,
  //   jobPosition,
  //   jobCategory,
  //   description,
  //   datePosted,
  //   search,
  //   sort,
  // } = req.query;

  const jobs = await ApplicationModel.find({ expired: false }); // Find all the jobs created by the user
  res.status(200).json({
    success: true,
    jobs,
  });

  //condition to check if the user is filtering the jobs
  // const queryObject = {
  //   createdBy: req.user._id,
  // };
  //Logic to filter the jobs
  // if (jobPosition && jobPosition !== "all") {
  //   queryObject.jobPosition = jobPosition;
  // }
  // if (jobCategory && jobCategory !== "all") {
  //   queryObject.jobCategory = jobCategory;
  // }
  // if (experienceLevel && experienceLevel !== "all") {
  //   queryObject.experienceLevel = experienceLevel;
  // }
  // if (location && location !== "all") {
  //   queryObject.location = location;
  // }
  // if (datePosted && datePosted !== "all") {
  //   queryObject.datePosted = datePosted;
  // }
  // if (search) {
  //   queryObject.jobPosition = { $regex: search, $options: "i" };
  // }

  // let queryResult = ApplicationModel.find(queryObject);

  // //Logic to sort the jobs
  // if (sort === "latest") {
  //   queryResult = queryResult.sort("-createdAt");
  // }
  // if (sort === "oldest") {
  //   queryResult = queryResult.sort("createdAt");
  // }
  // if (sort === "A-Z") {
  //   queryResult = queryResult.sort("jobPosition");
  // }
  // if (sort === "Z-A") {
  //   queryResult = queryResult.sort("-jobPosition");
  // }

  // //pagination logic
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // queryResult = queryResult.skip(skip).limit(limit);

  // //Jobs count
  // const totalJobs = await ApplicationModel.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalJobs / limit);

  // const jobs = await queryResult;
  // const jobs = await ApplicationModel.find({ createdBy: req.user._id }); // Find all the jobs created by the user
  //   res.status(200).send({ totalJobs, jobs, numOfPages });
  // } catch (error) {
  //   next(error);
  // }
});

// Get one job application
export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "User") {
    return next(
      new ErrorHandler(
        400,
        "You are not authorized to view this job application"
      )
    );
  }
  const myJobs = await ApplicationModel.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

//* === Update a job application ===
export const updateJobController = catchAsyncError(async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "User") {
    return next(
      new ErrorHandler(
        400,
        "You are not authorized to edit this job application"
      )
    );
  }
  const { id } = req.params;
  let job = await ApplicationModel.findById(id);
  if (!job) {
    return next(new ErrorHandler(400, "Oops, Job application not found!"));
  }
  job = await ApplicationModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job application updated successfully",
  });
});

//* === Delete a job application ===
export const deleteJobController = catchAsyncError(async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "User") {
    return next(
      new ErrorHandler(
        400,
        "You are not authorized to delete this job application"
      )
    );
  }
  const { id } = req.params;
  const job = await ApplicationModel.findById(id);
  if (!job) {
    return next(new ErrorHandler(400, "Oops, Job application not found!"));
  }
  await ApplicationModel.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job application deleted successfully",
  });
});

//* === Get the job application statistics ===
export const jobStatsController = async (req, res) => {
  try {
    const stats = await ApplicationModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Schema.Types.ObjectId(req.user._id),
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
          createdBy: new mongoose.Schema.Types.ObjectId(req.user._id),
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
