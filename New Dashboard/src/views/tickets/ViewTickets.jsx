import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Card, CardHeader, Col, Container, Row } from "reactstrap";
import { base_url } from "utils/base_url.js";
import TicketItems from "./TicketItems";

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch tickets from backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${base_url}/tickets/gettickets`); // Your API endpoint for fetching tickets
        console.log("comes here" + response);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        setError("Error fetching tickets. Please try again later.");
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Handle status change and update on backend
  const handleStatusChange = async (ticketId, currentStatus) => {
    const newStatus =
      currentStatus === "in-progress"
        ? "Rejected"
        : currentStatus === "Rejected"
        ? "Approved"
        : "in-progress";

    try {
      const response = await fetch(`/api/tickets/${ticketId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the UI with the new status
      setTickets(
        tickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
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
              <Row
                key={ticket._id}
                className="align-items-center border-bottom py-2"
              >
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
                          <a
                            href={ticket.files}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View PDF
                          </a>
                        ) : (
                          <img
                            src={ticket.files}
                            alt="file preview"
                            style={{ maxWidth: "100%" }}
                          />
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
                    onClick={() =>
                      handleStatusChange(ticket._id, ticket.status)
                    }
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
