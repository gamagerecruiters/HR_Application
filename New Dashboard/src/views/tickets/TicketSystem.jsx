import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import UserTickets from "./UserTicket";
import ViewTickets from "./ViewTickets";

const TicketSystem = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  

  // Shared state for tickets
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Check the URL parameter to see if the user is admin or user
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    setIsAdmin(role === "admin");
  }, [location]);

  // Add a new ticket
  const addTicket = (newTicket) => {
    const newTicketWithId = {
      ...newTicket,
      _id: Date.now().toString(),
      status: "in-progress",
      adminMessage: ""
    };
    setTickets([...tickets, newTicketWithId]);
  };

  // Update ticket status and admin message
  const updateTicketStatus = (ticketId, newStatus, adminMessage) => {
    setTickets(
      tickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, status: newStatus, adminMessage: adminMessage }
          : ticket
      )
    );
  };

  return (
    <div>
      {isAdmin ? (
        <ViewTickets tickets={tickets} updateTicketStatus={updateTicketStatus} />
      ) : (
        <UserTickets tickets={tickets} addTicket={addTicket} />
      )}
    </div>
  );
};

export default TicketSystem;
