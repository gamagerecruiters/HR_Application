import LeaveModel from "../models/leave.model.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.js";
import {
  isAuthorizedAdminAccess,
  isAuthorizedUserAccess,
  isAuthorizedSuperAdminAccess
} from "../services/authService.js";
import mongoose from "mongoose";
import { showUserOutput } from "../helpers/extractUserDetails.js";

// Add leave
export const addLeaveController = async (req, res, next) => {
  const { userId, startDate, endDate, reason, type , supervisorApproval} = req.body;

  try {
    // Verify the Authorized User Access
    // Implement your authorization logic here
     // Verify the user access
     if (!isAuthorizedUserAccess(req.user)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Validate required fields
    if (!userId || !startDate || !endDate || !reason || !type) {
      return next(new ErrorHandler(400, "Please provide all required fields!"));
    }

    const storeDateOfstartDate = new Date(startDate)
    const storeDateOfEndDate = new Date(endDate)


    // Check if the user exists
    // Implement your user existence check logic here

    // Find user by Id
    const findUser = await UserModel.find({ _id: userId });

    // If user not exist
    if (!findUser || findUser.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

     // Filter the required fields for the response. To prevent sending the password field to the response
     const userOutput = findUser.map((user) => {
      return showUserOutput(user);
    });


    const leaveObj = {
      userId,
      startDate : storeDateOfstartDate ,
      endDate : storeDateOfEndDate,
      reason,
      type,
    }

    // Verify the Authorized Admin Access
    if (isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      leaveObj.supervisorApproval = "Approved"
    }

    // Verify the Authorized Admin Access
    if (isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      leaveObj.supervisorApproval = "Approved"
      leaveObj.adminApproval = "Approved"

    }

    // Create a new leave object
    const newLeave = new LeaveModel(leaveObj);

    // Save the leave to the database
    await newLeave.save();

    

    // Respond with success message
    res
      .status(201)
      .json({ success: true, message: "Leave added successfully!" });
  } catch (error) {
    // Handle error
    next(error);
  }
};


export const getallSupervisorApprovalNeedController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin) && !isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find({supervisorApproval : "Pending"});

    if (!allLeaves) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};

export const getallSupervisorApprovedLeaveController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin) && !isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find({supervisorApproval : "Approved"});

    if (!allLeaves) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};

export const getallSupervisorRejectedLeaveController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin) && !isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find({supervisorApproval : "Rejected"});

    if (!allLeaves) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};


export const getallSuperAdminApprovalNeedController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find({supervisorApproval : "Approved", adminApproval : "Pending"});

    if (!allLeaves) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};

export const getallSuperAdminApprovedleaveController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find({adminApproval : "Approved"});

    if (!allLeaves) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};

export const getallSuperAdminRejectedleaveController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find({adminApproval : "Rejected"});

    if (!allLeaves) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};

export const getAllLeaveDetailsController = async (req, res, next) => {
  try {

    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin) && !isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Retrieve all leave records from the database
    const allLeaves = await LeaveModel.find();

    if (!allLeaves || allLeaves.length === 0) {
      return res
        .status(404)
        .json({ message: "Leaves not found", success: false });
    }


    // Respond with the leave records
    res.status(200).json({ success: true, data: allLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};


export const getLeaveDetailsByUserIdController = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Validate userId
    if (!userId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid parameters", success: false });
    }

    // Perform an aggregation to get leave details along with user information
    const userLeaves = await LeaveModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "users", // The collection name in MongoDB
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" }, // Unwind the userDetails array
      {
        $project: {
          _id: 1,
          userId: 1,
          startDate: 1,
          endDate: 1,
          type: 1,
          reason: 1,
          adminApproval: 1,
          supervisorApproval: 1,
          createdAt: 1,
          updatedAt: 1,
          "userDetails.firstName": 1,
          "userDetails.lastName": 1,
          "userDetails.email": 1,
          "userDetails.designation": 1,
          "userDetails.employmentType": 1,

        }
      }
    ]);

    // Respond with the leave records and user details
    res.status(200).json({ success: true, data: userLeaves });
  } catch (error) {
    // Handle error
    console.log("err", error)
    next(error);
  }
};


// export const getLeaveDetailsByUserIdController = async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     // Validate userId
//     if (!userId) {
//       throw new ErrorHandler(400, "Please provide all fields!");
//     }

//     // Check if userId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid parameters", success: false });
//     }

//     // Perform an aggregation to get leave details along with user information
//     const userLeaves = await LeaveModel.aggregate([
//       { $match: { userId: new mongoose.Types.ObjectId(userId) } },
//       {
//         $lookup: {
//           from: "users", // The collection name in MongoDB
//           localField: "userId",
//           foreignField: "_id",
//           as: "userDetails"
//         }
//       },
//       { $unwind: "$userDetails" }, // Unwind the userDetails array
//       {
//         $project: {
//           _id: 1,
//           userId: 1,
//           startDate: 1,
//           endDate: 1,
//           type: 1,
//           reason: 1,
//           adminApproval: 1,
//           supervisorApproval: 1,
//           createdAt: 1,
//           updatedAt: 1,
//           "userDetails.firstName": 1,
//           "userDetails.lastName": 1,
//           "userDetails.email": 1,
//           "userDetails.designation": 1,
//           "userDetails.employmentType": 1,
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           adminApprovalPending: {
//             $push: {
//               $cond: [
//                 { $eq: ["$adminApproval", "Pending"] },
//                 "$$ROOT",
//                 null
//               ]
//             }
//           },
//           adminApprovalApproved: {
//             $push: {
//               $cond: [
//                 { $eq: ["$adminApproval", "Approved"] },
//                 "$$ROOT",
//                 null
//               ]
//             }
//           },
//           adminApprovalRejected: {
//             $push: {
//               $cond: [
//                 { $eq: ["$adminApproval", "Rejected"] },
//                 "$$ROOT",
//                 null
//               ]
//             }
//           },
//           supervisorApprovalPending: {
//             $push: {
//               $cond: [
//                 { $eq: ["$supervisorApproval", "Pending"] },
//                 "$$ROOT",
//                 null
//               ]
//             }
//           },
//           supervisorApprovalApproved: {
//             $push: {
//               $cond: [
//                 { $eq: ["$supervisorApproval", "Approved"] },
//                 "$$ROOT",
//                 null
//               ]
//             }
//           },
//           supervisorApprovalRejected: {
//             $push: {
//               $cond: [
//                 { $eq: ["$supervisorApproval", "Rejected"] },
//                 "$$ROOT",
//                 null
//               ]
//             }
//           }
//         }
//       },
//       {
//         $project: {
//           adminApprovalPending: { $filter: { input: "$adminApprovalPending", as: "item", cond: { $ne: ["$$item", null] } } },
//           adminApprovalApproved: { $filter: { input: "$adminApprovalApproved", as: "item", cond: { $ne: ["$$item", null] } } },
//           adminApprovalRejected: { $filter: { input: "$adminApprovalRejected", as: "item", cond: { $ne: ["$$item", null] } } },
//           supervisorApprovalPending: { $filter: { input: "$supervisorApprovalPending", as: "item", cond: { $ne: ["$$item", null] } } },
//           supervisorApprovalApproved: { $filter: { input: "$supervisorApprovalApproved", as: "item", cond: { $ne: ["$$item", null] } } },
//           supervisorApprovalRejected: { $filter: { input: "$supervisorApprovalRejected", as: "item", cond: { $ne: ["$$item", null] } } },
//         }
//       }
//     ]);

//     // Respond with the categorized leave records and user details
//     res.status(200).json({ success: true, data: userLeaves[0] });
//   } catch (error) {
//     // Handle error
//     next(error);
//   }
// };


export const getLeaveDetailsByIdController = async (req, res, next) => {
  try {
    const {leaveId} = req.params;

    // Retrieve leave records associated with the specified user ID
    const userLeaves = await LeaveModel.find({ _id: leaveId });

    // Respond with the leave records
    res.status(200).json({ success: true, leave: userLeaves });
  } catch (error) {
    // Handle error
    next(error);
  }
};

// Update leave by leaveId 
export const updateLeaveController = async (req, res, next) => {
  const { leaveId } = req.params;
  const {
    startDate,
    endDate,
    type,
    reason,
  } = req.body;

  try {
    // Verify the user access (if needed)
    // Replace isAuthorizedUserAccess with your own authorization logic if required
    // Verify the Authorized Admin Access
    // if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized Access", success: false });
    // }

    // validate
    if (!leaveId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if employeeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    const leaveById = await LeaveModel.findOne({ _id: leaveId });

    if (!leaveById) {
      res.status(404).json({ message: "Leave Not Found", success: false });
    }



    // Update the employee properties if they are provided in the request body
    if (startDate) leaveById.startDate = startDate;
    if (endDate) leaveById.endDate = endDate;
    if (type) leaveById.type = type;
    if (reason) leaveById.reason = reason;
    

    
    await leaveById.save();

    res.status(200).json({
      message: "Leave Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Approve leave by only admin
export const adminApprovalLeaveController = async (req, res, next) => {
  const { leaveId } = req.params;
  const {supervisorApproval} = req.body;

  try {
    // Verify the user access (if needed)
    // Replace isAuthorizedUserAccess with your own authorization logic if required
    // Verify the Authorized Admin Access
    // if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized Access", success: false });
    // }

    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // validate
    if (!leaveId || !supervisorApproval) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if employeeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    const leaveById = await LeaveModel.findOne({ _id: leaveId });

    if (!leaveById) {
      res.status(404).json({ message: "Leave Not Found", success: false });
    }



    // Update the employee properties if they are provided in the request body
    leaveById.supervisorApproval = supervisorApproval
    
    

    
    await leaveById.save();

    res.status(200).json({
      message: "Admin Approved Leave  Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Approve leave by only superadmin
export const superAdminApprovalLeaveController = async (req, res, next) => {
  const { leaveId } = req.params;
  const {adminApproval} = req.body;

  try {
    // Verify the user access (if needed)
    // Replace isAuthorizedUserAccess with your own authorization logic if required
    // Verify the Authorized Admin Access
    // if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized Access", success: false });
    // }

    // Verify the Authorized Admin Access
    if (!isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // validate
    if (!leaveId || !adminApproval) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if employeeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    const leaveById = await LeaveModel.findOne({ _id: leaveId });

    if (!leaveById) {
      res.status(404).json({ message: "Leave Not Found", success: false });
    }



    // Update the employee properties if they are provided in the request body
    leaveById.adminApproval = adminApproval
    
    

    
    await leaveById.save();

    res.status(200).json({
      message: "Admin Approved Leave  Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



// Delete leave by leaveId by user
export const deleteLeaveByIdController = async (req, res, next) => {
  const {leaveId} = req.params;

  try {

    // Verify the user access
    if (!isAuthorizedUserAccess(req.user)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // validate
    if (!leaveId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if employeeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(leaveId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    // Find the leave record by its _id and delete it
    const deletedLeave = await LeaveModel.findByIdAndDelete({_id : leaveId});

    if (!deletedLeave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    // Respond with success message
    res.status(200).json({ success: true, message: "Leave deleted successfully" });
  } catch (error) {
    // Handle error
    next(error);
  }
};



// Leave Stats
export const getLeaveStatisticsController = async (req, res, next) => {
  try {
    // Verify superAdmin access
    if (!isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Fetch leave statistics
    const totalLeaves = await LeaveModel.countDocuments();
    const pendingLeaves = await LeaveModel.countDocuments({ adminApproval: "Pending" });
    const approvedLeaves = await LeaveModel.countDocuments({ adminApproval: "Approved" });
    const rejectedLeaves = await LeaveModel.countDocuments({ adminApproval: "Rejected" });

    // Group by type and calculate the number of leaves per type
    const leaveTypeCounts = await LeaveModel.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    // Group by user and calculate the number of leaves per user
    const leavePerUserCounts = await LeaveModel.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } }
    ]);

    // Respond with the statistics
    res.status(200).json({
      success: true,
      data: {
        totalLeaves,
        pendingLeaves,
        approvedLeaves,
        rejectedLeaves,
        leaveTypeCounts,
        leavePerUserCounts
      }
    });
  } catch (error) {
    // Handle error
    next(error);
  }
};



