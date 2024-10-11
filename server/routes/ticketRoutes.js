import express from "express";
import {
  addCommentToTicket,
  createTicket,
  getTickets,
  getUserTickets,
  sendMessageToUser,
  updateTicket,
  updateTicketStatus,
} from "../controllers/ticketController.js";

const router = express.Router();

// Create Ticket
router.post("/", createTicket);

// Get all tickets for admin
router.get("/gettickets", getTickets);

// Update ticket (Admin functionality)
router.put("/:id", updateTicket);

router.get("/:id", getUserTickets);

// Add comment to a ticket
router.post("/:id/comment", addCommentToTicket);

// Update ticket status
router.put("/:id/status", updateTicketStatus);

// Send message to user
router.post("/:id/message", sendMessageToUser);

export default router;
