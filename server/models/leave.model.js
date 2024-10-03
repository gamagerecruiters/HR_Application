import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          // `this` refers to the document being validated
          return this.startDate <= value;
        },
        message: "End date must be greater than or equal to start date",
      },
    },
    type: {
      type: String,
      enum: ["Sick Leave", "Annual Leave", "Maternity Leave", "Personal Leave", "Common", "Paternity Leave"], 
      default: "Common"
    },
    reason: {
      type: String,
      required: true,
    },
    adminApproval: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default : "Pending" 
    },
    supervisorApproval: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default : "Pending"  
    }
  },
  { timestamps: true }
);



const LeaveModel = mongoose.model("Leave", leaveSchema);

export default LeaveModel;
