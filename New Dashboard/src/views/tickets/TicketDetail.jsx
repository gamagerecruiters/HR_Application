import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardBody, CardHeader, Row, Col, Button, Input, Alert } from 'reactstrap';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy ticket data
    const dummyTicket = {
      _id: ticketId,
      description: "Fever and cold, need rest for 3 days",
      leaveType: "Sick Leave",
      status: "in-progress",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userEmail: "user@example.com",
      adminComment: "Reviewed",
      attachments: [
        { name: "Medical Certificate", url: "https://via.placeholder.com/100" }
      ],
      comments: [
        { text: "Please submit your medical report." }
      ],
      messages: [
        { message: "Your leave request is under review." }
      ]
    };

    // Simulating the fetch request for dummy data
    setTimeout(() => {
      setTicket(dummyTicket);
      setStatus(dummyTicket.status);
    }, 1000);

  }, [ticketId]);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTicket = await response.json();
      setTicket(updatedTicket);  // Update the local state with the new ticket data
      setStatus(newStatus);
      alert(`Ticket status updated to ${newStatus}`);
      navigate('/admin/tickets/');
    } catch (error) {
      setError('Failed to update status. Please try again.');
      console.error('Error updating ticket status:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert('Message cannot be empty');
      return;
    }
  
    try {
      const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const updatedTicket = await response.json();
      setTicket(updatedTicket);
      alert(`Message sent to ${ticket.userEmail}`);
      setMessage('');
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      alert('Comment cannot be empty');
      return;
    }
  
    try {
      const response = await fetch(`/api/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: comment }),
      });
      const updatedTicket = await response.json();
      setTicket(updatedTicket);
      alert('Comment added');
      setComment('');
    } catch (error) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', error);
    }
  };

  if (!ticket) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Button onClick={() => navigate('/admin/tickets/')} className="mb-3">
          Back to Tickets
        </Button>
        {error && <Alert color="danger">{error}</Alert>}
        <Card className="shadow">
          <CardHeader className="bg-primary text-white">
            <h3 className="mb-0">Ticket Details</h3>
          </CardHeader>
          <CardBody>
            <Row className="mb-3">
              <Col>
                <strong>Ticket ID:</strong> {ticket._id}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Description:</strong> {ticket.description}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Leave Type:</strong> {ticket.leaveType}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Status:</strong> {status}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>User Email:</strong> {ticket.userEmail}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Admin Comment:</strong> {ticket.adminComment}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Supporting Documents:</strong>
                <ul>
                  {ticket.attachments?.map((attachment, index) => (
                    <li key={index}><a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a></li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Comments:</strong>
                <ul>
                  {ticket.comments?.map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Messages:</strong>
                <ul>
                  {ticket.messages?.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Input
                  type="select"
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Input>
              </Col>
              <Col md="4">
                <Input
                  type="textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send a message"
                />
                <Button color="primary" onClick={handleSendMessage} className="mt-2">
                  Send Message
                </Button>
              </Col>
              <Col md="4">
                <Input
                  type="textarea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <Button color="primary" onClick={handleAddComment} className="mt-2">
                  Add Comment
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default TicketDetails;
