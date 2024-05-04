import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function ResumeCoverLetter() {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Resume and Cover Letter</h2>
      <Row>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Resume 1</Card.Title>
              <Card.Text>
                This is a sample resume. You can view, edit, or delete it.
              </Card.Text>
                <div className="mt-2"> {/* Add margin-top */}
                    <Button variant="secondary" className="mr-2">View</Button> {/* Add margin-right */}
                    <Button variant="info" className="mr-2">Edit</Button> {/* Add margin-right */}
                    <Button variant="danger">Delete</Button>
                </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
        <Card className="mb-4">
            <Card.Body>
            <Card.Title>Cover Letter 1</Card.Title>
            <Card.Text>
                This is a sample cover letter. You can view, edit, or delete it.
            </Card.Text>
            <div className="mt-2"> {/* Add margin-top */}
                <Button variant="secondary" className="mr-2">View</Button> {/* Add margin-right */}
                <Button variant="info" className="mr-2">Edit</Button> {/* Add margin-right */}
                <Button variant="danger">Delete</Button>
            </div>
            </Card.Body>
        </Card>
        </Col>

      </Row>
      
      <Button variant="secondary">Add New</Button>
    </Container>
  );
}

export default ResumeCoverLetter;
