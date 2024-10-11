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

  // Fetch the ticket details from the backend when the component mounts
  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/tickets/${id}`); // Assuming /api/tickets/:id is your endpoint
        const ticketData = response.data;
        setTicket(ticketData);
        setStatus(ticketData.status); // Set the initial status
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [id]);

  // Handle status update
  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${base_url}/tickets/${id}/status`, { status }); // Assuming /api/tickets/:id/status is your endpoint
      alert(`Status updated to: ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    try {
      await axios.post(`${base_url}/tickets/${id}/message`, { message }); // Assuming /api/tickets/:id/message is your endpoint
      alert(`Message sent: ${message}`);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="d-flex justify-content-center">
          <div className="col-md-8">
            <Card className="shadow">
              <CardHeader className="text-center">
                <h3 className="mb-0">Ticket Details</h3>
              </CardHeader>
              <Form>
                <Col md={10} className="mx-auto">
                  <FormGroup row className="mt-3">
                    <Label sm={4}>
                      <strong>Description:</strong>
                    </Label>
                    <Col sm={8}>
                      <p>{ticket.description}</p>
                    </Col>
                  </FormGroup>

                  <FormGroup row className="mt-3">
                    <Label sm={4}>
                      <strong>Leave Type:</strong>
                    </Label>
                    <Col sm={8}>
                      <p>{ticket.leaveType}</p>
                    </Col>
                  </FormGroup>

                  {ticket.files && ticket.files.map((file, index) => (
                    <FormGroup row key={index}>
                      <Label sm={4}>
                        <strong>File {index + 1}:</strong>
                      </Label>
                      <Col sm={8}>
                        <a href={file.filePath} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                          View File
                        </a>
                      </Col>
                    </FormGroup>
                  ))}

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

                  <div className="d-flex justify-content-center mt-3">
                    <Button onClick={handleUpdateStatus} className="mb-4 rounded hover:bg-blue-700"
                      style={{ backgroundColor: '#2563eb', color: '#ffffff' }} >
                      Update Status
                    </Button>
                  </div>

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

                  <div className="d-flex justify-content-center mt-3">
                    <Button onClick={handleSendMessage} className="mb-4 rounded hover:bg-blue-700"
                      style={{ backgroundColor: '#2563eb', color: '#ffffff' }} >
                      Send Message
                    </Button>
                  </div>
                </Col>
              </Form>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminViewTicket;
