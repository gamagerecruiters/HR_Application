import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const AdminViewTicket = () => {
  const { id } = useParams(); // Get the ticket ID from the URL
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Dummy ticket data for demonstration
    const dummyTicket = {
      _id: id, // Simulate the ticket ID
      description: "This is a sample ticket description.",
      leaveType: "Educational",
      files: [
        { filePath: "https://via.placeholder.com/150" }, // Dummy file URL
        { filePath: "https://via.placeholder.com/150" },
      ],
      status: "pending",
    };

    // Set the ticket data and status from dummy data
    setTicket(dummyTicket);
    setStatus(dummyTicket.status);
  }, [id]); 

  const handleUpdateStatus = async () => {
    // Handle status update (mocked for now)
    alert(`Status updated to: ${status}`);
  };

  const handleSendMessage = async () => {
    // Handle sending a message (mocked for now)
    alert(`Message sent: ${message}`);
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
