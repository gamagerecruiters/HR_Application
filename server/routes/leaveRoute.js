import express from "express";
import { sendToken } from "../middlewares/jwtValidation.js"; //* Import the validateToken middleware from the middlewares folder
import { isAuthorized } from "../middlewares/auth.js"; //* Import the Authorization middleware from the middlewares folder
import {
  addLeaveController,
  getAllLeaveDetailsController,
  getLeaveDetailsByUserIdController,
  getLeaveDetailsByIdController,
  updateLeaveController,
  deleteLeaveByIdController,
  adminApprovalLeaveController,
  superAdminApprovalLeaveController,
  getallSupervisorApprovalNeedController,
  getallSuperAdminApprovalNeedController,
  getallSupervisorApprovedLeaveController,
  getallSupervisorRejectedLeaveController,
  getallSuperAdminApprovedleaveController,
  getallSuperAdminRejectedleaveController,
  getLeaveStatisticsController
} from "../controllers/leaveController.js";

const leaveRouter = express.Router();

leaveRouter.post("/add-leave", isAuthorized, addLeaveController);

leaveRouter.get("/all-leave", isAuthorized,  getAllLeaveDetailsController);

leaveRouter.get("/all-leave-need-supervisor-approval", isAuthorized,  getallSupervisorApprovalNeedController);

leaveRouter.get("/all-leave-supervisor-approved", isAuthorized,  getallSupervisorApprovedLeaveController);

leaveRouter.get("/all-leave-supervisor-rejected", isAuthorized,  getallSupervisorRejectedLeaveController);


leaveRouter.get("/all-leave-need-SuperAdmin-approval", isAuthorized,  getallSuperAdminApprovalNeedController);

leaveRouter.get("/all-leave-admin-rejected", isAuthorized,  getallSuperAdminRejectedleaveController);

leaveRouter.get("/all-leave-admin-approved", isAuthorized,  getallSuperAdminApprovedleaveController);



leaveRouter.get("/get-leave/:userId", isAuthorized, getLeaveDetailsByUserIdController);

leaveRouter.get("/get-leave-by-leaveId/:leaveId", isAuthorized, getLeaveDetailsByIdController);

leaveRouter.patch("/update-leave/:leaveId", isAuthorized, updateLeaveController);

leaveRouter.put("/update-leave-adminApproval/:leaveId", isAuthorized ,  adminApprovalLeaveController);

leaveRouter.put("/update-leave-superAdminApproval/:leaveId", isAuthorized,  superAdminApprovalLeaveController);


leaveRouter.delete("/delete-leave/:leaveId", isAuthorized, deleteLeaveByIdController);


leaveRouter.get("/leave-statistics", isAuthorized, getLeaveStatisticsController);


export default leaveRouter;
