// components/AdminViewTicket.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { base_url } from "utils/base_url.js";
import {
  Button,
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  Row,
  CardHeader,
} from "reactstrap";
import Header from "components/Headers/Header";
import axios from 'axios'; // Import axios to make API requests

const AdminViewTicket = () => {
  const { id } = useParams(); // Get the ticket ID from the URL
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch the ticket details from the backend when the component mounts
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        const response = await axios.get(`${base_url}/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ticketData = response.data;
        setTicket(ticketData);
        setStatus(ticketData.status); // Set the initial status
      } catch (error) {
        setError("Error fetching ticket details. Please try again later.");
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [id]);

  // Handle status update
  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
      const response = await axios.put(`${base_url}/tickets/${id}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`Status updated to: ${response.data.status}`);
      setTicket(response.data); // Update ticket state with new status
    } catch (error) {
      setError("Failed to update status. Please try again later.");
      console.error("Error updating ticket status:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
      const response = await axios.post(`${base_url}/tickets/${id}/message`, { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`Message sent: ${message}`);
      setTicket(response.data); // Update ticket state with new message
      setMessage(''); // Clear message input
    } catch (error) {
      setError("Failed to send message. Please try again later.");
      console.error("Error sending message:", error);
    }
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Display error if any */}
        {error && <div className="alert alert-danger">{error}</div>}

        <Row className="d-flex justify-content-center">
          <div className="col-md-8">
            <Card className="shadow">
              <CardHeader className="text-center">
                <h3 className="mb-0">Ticket Details</h3>
              </CardHeader>
              <Form>
                <Col md={10} className="mx-auto">

                 {/* User ID */}
                 <FormGroup row className="mt-3">
                    <Label sm={4}>
                      <strong>User ID:</strong>
                    </Label>
                    <Col sm={8}>
                      <p>{ticket._id}</p>
                    </Col>
                  </FormGroup>

                  {/* User Email */}
                  <FormGroup row className="mt-3">
                    <Label sm={4}>
                      <strong>User Email:</strong>
                    </Label>
                    <Col sm={8}>
                      <p>{ticket.userEmail}</p>
                    </Col>
                  </FormGroup>

                  {/* Description */}
                  <FormGroup row className="mt-3">
                    <Label sm={4}>
                      <strong>Description:</strong>
                    </Label>
                    <Col sm={8}>
                      <p>{ticket.description}</p>
                    </Col>
                  </FormGroup>

                  {/* Leave Type */}
                  <FormGroup row className="mt-3">
                    <Label sm={4}>
                      <strong>Leave Type:</strong>
                    </Label>
                    <Col sm={8}>
                      <p>{ticket.leaveType}</p>
                    </Col>
                  </FormGroup>

                  {/* Files */}
                  {ticket.files && ticket.files.length > 0 && (
                    <>
                      <Label sm={4}>
                        <strong>Files:</strong>
                      </Label>
                      <Col sm={8}>
                        <ul className="list-unstyled mb-0">
                          {ticket.files.map((file, index) => (
                            <li key={index}>
                              {file.filePath.endsWith('.pdf') ? (
                                <a
                                  href={`${base_url}${file.filePath}`}
                                  className="text-blue-500 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View PDF {index + 1}
                                </a>
                              ) : (
                                <img
                                  src={`${base_url}${file.filePath}`}
                                  alt={`File ${index + 1}`}
                                  style={{ maxWidth: "100%" }}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </>
                  )}

                  {/* Update Status */}
                  <FormGroup row className="mt-4">
                    <Label sm={4} for="status">
                      Update Status
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Input>
                    </Col>
                  </FormGroup>

                  {/* Update Status Button */}
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      onClick={handleUpdateStatus}
                      className="mb-4 rounded hover:bg-blue-700"
                      style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                    >
                      Update Status
                    </Button>
                  </div>

                  {/* Send Message */}
                  <FormGroup row className="mt-4">
                    <Label sm={4} for="message">
                      Send Message
                    </Label>
                    <Col sm={8}>
                      <textarea
                        id="message"
                        className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message"
                        rows={4}
                      ></textarea>
                    </Col>
                  </FormGroup>

                  {/* Send Message Button */}
                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      onClick={handleSendMessage}
                      className="mb-4 rounded hover:bg-blue-700"
                      style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                    >
                      Send Message
                    </Button>
                  </div>
                </Col>
              </Form>
            </Card>
          </div>
          <Row>
            <Col md="12">
              <Button color="primary" onClick={() => window.history.back()}>Back</Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default AdminViewTicket;
