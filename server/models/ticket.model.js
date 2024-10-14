import mongoose from "mongoose";

// MessageSchema
const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  sentBy: { type: String, required: true },
});

// TicketSchema
const TicketSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: { 
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Personal", "Educational", "Medical"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"], // Adjusting the status options
    default: "pending",
  },
  files: [
    {
      fileName: String,
      filePath: String,
    },
  ],
  messages: [MessageSchema], // Embed MessageSchema
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

export default TicketModel;
