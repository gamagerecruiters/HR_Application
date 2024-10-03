import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header";
import TicketItems from "./TicketItems";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Row,
  Col,
  Container,
  Alert
} from "reactstrap";

const ViewTickets = () => {
  // Dummy data for testing
  const dummyTickets = [
    {
      _id: "1",
      leaveType: "Sick Leave",
      description: "Fever and cold, need rest for 3 days",
      files: "https://via.placeholder.com/100", // Dummy image URL
      fileType: "image",
      status: "in-progress"
    },
    {
      _id: "2",
      leaveType: "Casual Leave",
      description: "Family function, need leave for 2 days",
      files: "",
      fileType: "",
      status: "Approved"
    },
    {
      _id: "3",
      leaveType: "Vacation",
      description: "Planning a trip for a week",
      files: "https://www.example.com/sample.pdf", // Dummy PDF URL
      fileType: "pdf",
      status: "Rejected"
    }
  ];

  const [tickets, setTickets] = useState(dummyTickets);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleStatusChange = async (ticketId, currentStatus) => {
    const newStatus =
      currentStatus === "in-progress"
        ? "Rejected"
        : currentStatus === "Rejected"
        ? "Approved"
        : "in-progress";

    try {
      // Simulate an API response for the status update
      setTickets(tickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      ));
    } catch (error) {
      setError("Failed to update status. Please try again later.");
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {error && <Alert color="danger">{error}</Alert>}
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Tickets</h3>
          </CardHeader>
          <CardHeader className="bg-secondary text-black">
            <Row>
              <Col className="col-2">Employee No</Col>
              <Col className="col-2">Leave Type</Col>
              <Col className="col-3">Description</Col>
              <Col className="col-2">Files</Col>
              <Col className="col-2">Status</Col>
              <Col className="col-1">Actions</Col>
            </Row>
          </CardHeader>
          <div className="p-3">
            {tickets.map((ticket) => (
              <Row key={ticket._id} className="align-items-center border-bottom py-2">
                <Col className="col-2">{ticket._id}</Col>
                <Col className="col-2">
                  <p className="mb-0">{ticket.leaveType}</p>
                </Col>
                <Col className="col-3">
                  <p className="mb-0">{ticket.description}</p>
                </Col>
                <Col className="col-2">
                  {ticket.files ? (
                    <ul className="list-unstyled mb-0">
                      <li>
                        {ticket.fileType === "pdf" ? (
                          <a href={ticket.files} target="_blank" rel="noopener noreferrer">View PDF</a>
                        ) : (
                          <img src={ticket.files} alt="file preview" style={{ maxWidth: "100%" }} />
                        )}
                      </li>
                    </ul>
                  ) : (
                    <p className="mb-0">No files uploaded</p>
                  )}
                </Col>
                <Col className="col-2">
                  <div
                    className={`badge px-2 py-1 ${
                      ticket.status === "in-progress"
                        ? "badge-warning"
                        : ticket.status === "Approved"
                        ? "badge-success"
                        : ticket.status === "Rejected"
                        ? "badge-danger"
                        : "badge-secondary"
                    }`}
                    onClick={() => handleStatusChange(ticket._id, ticket.status)}
                    role="button"
                    tabIndex="0"
                    style={{ cursor: "pointer" }}
                  >
                    {ticket.status}
                  </div>
                </Col>
                <Col className="col-1">
                  <TicketItems ticket={ticket} />
                </Col>
              </Row>
            ))}
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ViewTickets;
