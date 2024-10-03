
import Ticket from '../models/ticket.model.js' 
import multer from 'multer';
import path from 'path';

// Configure Multer for file uploads
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });




export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  const { description, leaveType, files,fileType } = req.body;
  

  const newTicket = new Ticket({
    description,
    leaveType,
    files,
    fileType,
    status: 'pending', // Default status set to 'open'
    userEmail,
    createdAt: new Date()
  });

  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket_id = req.params.id;
    const { description, status, leaveType } = req.body;
    const files = req.files ? req.files.map(file => ({
      fileName: file.originalname,
      filePath: `/${file.path}`,
    })) : [];

    const updateFields = { description, status, leaveType };
    if (files.length > 0) {
      updateFields.files = files;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      updateFields,
      { new: true }
    );

    if (!ticket) {
      res.status(404).json({ error: "No ticket by that id found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket_id = req.params.id;
    const ticket = await Ticket.findByIdAndDelete(ticket_id);

    if (!ticket) {
      res.status(404).json({ error: "No ticket by that id found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const viewTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(201).json(tickets);
};

export const viewTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("No Ticket found");
  }
  if (ticket.user && ticket.user.toString() != req.user.id) {
    res.status(400);
    throw new Error("Not Authorized");
  }
  res.status(201).json(ticket);
};

// Add comment to ticket
export const addCommentToTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.comments.push({ text });
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const message =`Your ticket status has been updated to: ${status}`;
    ticket.messages.push({message, sentAt:new Date(), sentBy:'admin'});
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessageToUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const { message } = req.body; 

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.messages.push({ message, sentAt: new Date(), sentBy: 'admin' });

    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewUserTickets = async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming you have user info available in req.user
    const tickets = await Ticket.find({ userEmail });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

