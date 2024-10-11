import React, { useEffect, useState } from "react";
import { base_url } from "utils/base_url.js";

import axios from "axios"; // Assuming you're using Axios for API calls
import Header from "components/Headers/Header";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const UserTickets = () => {
  const currentUserId = "123"; // Simulated current user ID, this can be dynamic if you're using auth
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    leaveType: "",
    description: "",
    files: null,
    fileType: null,
  });
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  // Fetch tickets from backend when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${base_url}/tickets/${currentUserId}`
        ); // Replace with your backend endpoint
        console.log("tickets " + response.data);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [currentUserId]);

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
      files: file,
      fileType: file.type.includes("pdf") ? "pdf" : "image",
    });
  };

  // Handle form submission
  // Simplified Axios request without files
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle file uploads along with text fields
    const formData = new FormData();
    formData.append("leaveType", newTicket.leaveType);
    formData.append("description", newTicket.description);
    formData.append("userName", "123");

    // Check if file exists before appending
    if (newTicket.files) {
      formData.append("files", newTicket.files);
      formData.append("fileType", newTicket.fileType); // Include file type
    }

    try {
      const response = await axios.post(`${base_url}/tickets`, formData, {
        headers: {
          "Content-Type": "form-data", // Required for file uploads
        },
      });
      console.log("Ticket submitted successfully:", response.data);

      // Update ticket list
      setTickets([...tickets, response.data]);

      // Reset form
      setNewTicket({
        leaveType: "",
        description: "",
        files: null,
        fileType: null,
      });
      toggleModal(); // Close modal
    } catch (error) {
      // console.error("Error submitting ticket:", error);
    }
  };

  // Filter tickets to show only the current user's tickets
  // const userTickets = tickets.filter(
  //   (ticket) => ticket.userId === currentUserId
  // );

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
