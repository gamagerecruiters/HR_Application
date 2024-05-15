import Header from "components/Headers/Header";
import React from "react";
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

const LeavesApplyForm = () => {
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="d-flex justify-content-center">
          <div className="col-md-8">
            <Card className="shadow">
              <CardHeader className="text-center">
                <h3 className="mb-0">Apply for Leave</h3>
              </CardHeader>
              <Form>
                <Col md={10} className="mx-auto">
                  <FormGroup row className="mt-3">
                    <Label sm={4} for="exampleEmail">
                      Employee No
                    </Label>
                    <Col sm={8}>
                      <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="Enter Employee No"
                        type="email"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="type">
                      Type
                    </Label>
                    <Col sm={8}>
                      <FormGroup check>
                        <Label check>
                          <Input name="radio2" type="radio" /> Full Day
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input name="radio2" type="radio" /> Half Day
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup className="mt-3" row>
                    <Label sm={4} for="selectLeave">
                      Leave Type
                    </Label>
                    <Col sm={8}>
                      <Input id="selectLeave" name="select" type="select">
                        <option>Select Type</option>
                        <option>Personal</option>
                        <option>Casual</option>
                        <option>Urgent</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} for="from">
                      From
                    </Label>
                    <Col sm={8}>
                      <Input id="selectFrom" name="selectDate" type="date" />
                    </Col>

                    <Label sm={4} for="to">
                      To
                    </Label>
                    <Col sm={8}>
                      <Input id="selectTo" name="selectDate" type="date" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="leaveReason" sm={4}>
                      Reason for the leave
                    </Label>
                    <Col sm={8}>
                      <Input id="leaveReason" name="text" type="textarea" />
                    </Col>
                  </FormGroup>
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

export default LeavesApplyForm;
