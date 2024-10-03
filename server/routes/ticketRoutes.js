import express from "express";
import {
    createTicket,
    getTickets,
    viewTicket,
    updateTicketStatus,
    addCommentToTicket,
    updateTicket,
    deleteTicket,
    sendMessageToUser,
} from '../controllers/ticketController.js';

const router = express.Router();

// Routes
router.post('/', createTicket);
router.get('/', getTickets); 
router.get('/view-tickets/:id', viewTicket);
router.put('/:id/status', updateTicketStatus);
router.post('/:id/comment', addCommentToTicket); // Add comment route
router.put('/:id/message', sendMessageToUser); // Send message route
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;
