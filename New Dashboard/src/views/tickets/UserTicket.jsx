import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const dummyTickets = [
  {
    _id: "1",
    userId: "123",
    leaveType: "Personal",
    description: "Going on vacation",
    files: null,
    status: "in-progress",
    fileType: null,
    adminMessage: "", // Admin message or comment
  },
  {
    _id: "2",
    userId: "456",
    leaveType: "Educational",
    description: "Attending a workshop",
    files: "https://example.com/file.pdf",
    status: "Approved",
    fileType: "pdf",
    adminMessage: "Approved. Have a great time at the workshop!",
  },
  {
    _id: "3",
    userId: "123",
    leaveType: "Medical",
    description: "Medical check-up",
    files: "https://example.com/image.jpg",
    status: "Rejected",
    fileType: "image",
    adminMessage: "Rejected. Please provide a doctor's note.",
  },
  {
    _id: "4",
    userId: "789",
    leaveType: "Personal",
    description: "Family event",
    files: "https://example.com/image.jpg",
    fileType: "image",
    status: "in-progress",
    adminMessage: "",
  },
  {
    _id: "5",
    userId: "123",
    leaveType: "Educational",
    description: "Conference",
    files: "https://example.com/image.jpg",
    fileType: "image",
    status: "Approved",
    adminMessage: "Approved. Best wishes for the conference.",
  },
];

const UserTickets = () => {
  const currentUserId = "123"; // Simulated current user ID
  const [tickets, setTickets] = useState(dummyTickets);
  const [newTicket, setNewTicket] = useState({
    leaveType: "",
    description: "",
    files: null,
    fileType: null,
  });
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  // Fetch tickets from Local Storage on component mount
  useEffect(() => {
    const savedTickets = localStorage.getItem("tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets)); // Parse and set the tickets from Local Storage
    }
  }, []);

  // Save tickets to Local Storage whenever tickets state changes
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewTicket({ 
      ...newTicket, 
      files: URL.createObjectURL(file),
      fileType: file.type.includes('pdf') ? 'pdf' : 'image'
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicketData = {
      ...newTicket,
      _id: String(tickets.length + 1),
      userId: currentUserId,
      status: "in-progress",
      adminMessage: "", // New ticket has no admin message initially
    };
    setTickets([...tickets, newTicketData]);
    setNewTicket({
      leaveType: "",
      description: "",
      files: null,
      fileType: null,
    });
    toggleModal(); // Close the modal after submission
  };

  // Filter tickets to show only the current user's tickets
  const userTickets = tickets.filter(ticket => ticket.userId === currentUserId);

  return (
    <>
      <Header />
    
      <Container className="mt--9" fluid>
        {/* Button to Open Modal */}
        <Button color="primary" onClick={toggleModal} className="mt-4">
          Create New Ticket
        </Button>
        <Card className="shadow">   
          <CardHeader className="border-0">
            <h3 className="mb-0">My Tickets</h3>
          </CardHeader>
          <CardHeader className="bg-secondary text-black">
            <Row>
              <Col className="col-2">Ticket No</Col>
              <Col className="col-2">Leave Type</Col>
              <Col className="col-3">Description</Col>
              <Col className="col-2">Files</Col>
              <Col className="col-2">Status</Col>
            </Row>
          </CardHeader>
          <div className="p-3">
            {userTickets.map((ticket) => (
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
                          <a href={ticket.files}>View PDF</a>
                        ) : (
                          <img src={ticket.files} alt="file preview" style={{ maxWidth: "100%" }} />
                        )}
                      </li>
                    </ul>
                  ) : (
                    <p className="mb-0">No files uploaded</p>
                  )}
                </Col>
                <Col className="col-3">
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
                  >
                    {ticket.status}
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </Card>
        
        {/* Modal for Creating New Ticket */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Create New Ticket</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="leaveType">Leave Type</Label>
                <Input
                  type="select"
                  name="leaveType"
                  id="leaveType"
                  value={newTicket.leaveType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Personal">Personal</option>
                  <option value="Educational">Educational</option>
                  <option value="Medical">Medical</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={newTicket.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="files">Upload Files</Label>
                <Input
                  type="file"
                  name="files"
                  id="files"
                  onChange={handleFileUpload}
                />
              </FormGroup>
              <Button type="submit" color="primary">
                Submit Ticket
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default UserTickets;
