import mongoose from "mongoose";

//MessageSchema 
const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  sentBy: { type: String, required: true },
});

//TicketSchema
const TicketSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true
  },
  description: { 
    type: String,
    required: true,
  },
  status: { 
    type: String,
    enum: ['in-progress', 'Rejected', 'Approved'],
    default: 'in-progress',
  },
  leaveType: {
    type: String,
    enum: ['Personal', 'Educational', 'Medical'],
    required: true,
  },
  files: {
    type: String
  },
  fileType:{
    type: String
  },
  messages: [MessageSchema],
  createdAt: { 
    type: Date, 
    default: new Date(),
  },
  userEmail: String, // For sending messages
  comments: [{ // Adding comments field
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

const TicketModel = mongoose.model("Ticket", TicketSchema);

export default TicketModel;
