import ApplicantModel from "../models/applicants.model.js";

// Admin can get all applications
export const adminGetAllApplications = async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "User") {
    return next(
      new Error("Applicant is not authorized to access this resources!", 401)
    );
  }
  const { _id } = req.user;
  const applications = await ApplicantModel.find({ "employerID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
};

// user can get all applications
export const userGetAllApplications = async (req, res, next) => {
  const { userType } = req.user;
  if (userType === "Admin") {
    return next(
      new Error("Employer is not authorized to access this resources!", 401)
    );
  }
  const { _id } = req.user;
  const applications = await ApplicantModel.find({ "applicantID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
};

// user can delete the application
export const userDeleteApplication = async (req, res, next) => {
  const { userType } = req.user;
  if (userType !== "User") {
    return next(
      new Error("Employer is not authorized to access this resources!", 401)
    );
  }
  const { id } = req.params;
  const application = await ApplicantModel.findById(id);
  if (!application) {
    return next(new Error("Oops, Application not found!", 404));
  }
  await application.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application deleted successfully!",
  });
};
