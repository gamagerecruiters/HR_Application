import ApplicantModel from "../models/applicants.model.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import ApplicationModel from "../models/application.model.js";

// Admin can get all applications
export const adminGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { userType } = req.user;
    if (userType === "User") {
      return next(
        new ErrorHandler(
          401,
          "Applicant is not authorized to access this resources!"
        )
      );
    }
    const { _id } = req.user;
    const applications = await ApplicantModel.find({
      "employerID.user": _id,
    }).populate({
      path: "applicationID.application",
      select: "jobTitle",
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// user can get all applications
export const userGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { userType } = req.user;
    if (userType === "Admin") {
      return next(
        new ErrorHandler(
          401,
          "Employer is not authorized to access this resources!"
        )
      );
    }
    const { _id } = req.user;
    const applications = await ApplicantModel.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// user can delete the application
export const userDeleteApplication = catchAsyncError(async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "Admin") {
    return next(
      new ErrorHandler(
        400,
        "Employer is not authorized to access this resources!"
      )
    );
  }
  const { id } = req.params;
  const application = await ApplicantModel.findByIdAndDelete(id);
  if (!application) {
    return next(new ErrorHandler(404, "Oops, Application not found!"));
  }
  await ApplicantModel.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application deleted successfully!",
  });
});

// user can post an application
export const postApplication = catchAsyncError(async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "Admin") {
    return next(
      new ErrorHandler(
        400,
        "Employer is not authorized to access this resources!"
      )
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler(400, "Please upload a resume!"));
  }
  const { resume } = req.files;
  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler(400, "Please upload a valid resume!"));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  console.log(cloudinaryResponse);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(new ErrorHandler(500, "Oops, something went wrong!"));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    userType: "User",
  };
  if (!jobId) {
    return next(new ErrorHandler(400, "Job not found!"));
  }
  const jobDetails = await ApplicationModel.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler(400, "Job not found!"));
  }
  const employerID = {
    user: jobDetails.postedBy,
    userType: "Admin",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler(400, "Please fill all fields!"));
  }
  const application = await ApplicantModel.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    applicantID,
    employerID,
    applicationID: {
      application: jobId, // Add this line
    },
  });
  res.status(200).json({
    success: true,
    message: "Application submitted successfully!",
    application,
  });
});
