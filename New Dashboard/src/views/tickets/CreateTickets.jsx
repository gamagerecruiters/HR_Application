import React from 'react'
import Header from 'components/Headers/Header'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, ticketActions } from "../tickets/redux/ticket/ticketSlice";
import {
  Button,
  Card,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Col,
  Container,
  Row,
  CardHeader,
} from "reactstrap";
import useStorage from './hooks/useStorage';

const { reset } = ticketActions;

const CreateTickets = () => {
  // const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message, ticket } = useSelector(
    (state) => state.tickets
  );

  // const [name] = useState(user.name);
  // const [email] = useState(user.email);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [leaveType, setLeaveType] = useState("Personal");
  const [uploadFile, setUploadFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const { startUpload } = useStorage(setProgress, setError, setImgUrl, setFileType);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    } else if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
  }, [ticket]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      startUpload(e.target.files[0]);
      const selectedImageFile = new FileReader();

      selectedImageFile.onload = function () {
        setPreview(selectedImageFile.result);
      };

      selectedImageFile.readAsDataURL(e.target.files[0]);
    }
  };



  const onSubmit = (e) => {
    e.preventDefault();

    const data= {
      description: description,
      leaveType: leaveType,
      files: imgUrl,
      fileType: fileType
    }
  

    console.log('formData',data);

    dispatch(createTicket(data));
  };



  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="d-flex justify-content-center">
          <div className="col-md-8">
            <Card className="shadow">
              <CardHeader className="text-center">
                <h3 className="mb-0">Create New Ticket</h3>
                <p>Please fill out the form below</p>
              </CardHeader>
              <Form onSubmit={onSubmit}>
                <Col md={10} className="mx-auto">
                  <FormGroup row className="mt-3">
                    <Label sm={4} for="exampleEmail">
                      Employee Email
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="exampleEmail"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Employee Email"
                        type="email"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup className="mt-3" row>
                    <Label sm={4} for="selectLeave">
                      Leave Type
                    </Label>
                    <Col sm={8}>
                    <select
                      id="leaveType"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                    >
                      <option value="Personal">Personal</option>
                      <option value="Educational">Educational</option>
                      <option value="Medical">Medical</option>
                    </select>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="leaveReason" sm={4}>
                      Reason for the leave
                    </Label>
                    <Col sm={8}>
                    <textarea
                      id="description"
                      cols={43}
                      name="description"
                      className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Description"
                      type="textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    </Col>
                  </FormGroup>
                  
                  {(leaveType === "Educational" || leaveType === "Medical") && (
                    <FormGroup row>
                      <label sm={4} for="file">
                        Upload File (Image,PDF,Report)
                      </label>
                      <Col sm={8}>
                      <input
                        type="file"
                        id="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp,.pdf, .txt,.doc, .docx"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleFileChange}
                      />
                      </Col>
                    </FormGroup>
                  )}
                  <div className="d-flex justify-content-center mt-3">
                    <Button className="mb-4">Submit</Button>
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

export default CreateTickets
