import React from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import './App.scss';
import Sidebar from './components/Sidebar';
import ResumeCoverLetter from './components/ResumeCoverLetter';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  // Dummy data for list of job applications
  const jobApplications = [
    { id: 1, companyName: 'Example Company 1', position: 'Software Engineer', status: 'Applied' },
    { id: 2, companyName: 'Example Company 2', position: 'Data Analyst', status: 'Interview Scheduled' },
    { id: 3, companyName: 'Example Company 3', position: 'Product Manager', status: 'Offer Received' },
  ];

  return (
    <Container fluid className="App">
      <Row>
        {isAuthenticated && (
          <Col md={2} className="sidebar-container">
            <Sidebar /> {/* Include the Sidebar component if user is authenticated */}
          </Col>
        )}
        <Col md={isAuthenticated ? 10 : 12}> {/* Adjust the column width based on authentication status */}
          <header>
            <h1>ApplyD</h1>
          </header>
          {isAuthenticated && (
            <main>
              <Row>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Add New Job Application</Card.Title>
                      <Form>
                        <Form.Group controlId="companyName">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter company name" />
                        </Form.Group>
                        <Form.Group controlId="position">
                          <Form.Label>Position</Form.Label>
                          <Form.Control type="text" placeholder="Enter position" />
                        </Form.Group>
                        <Form.Group controlId="status">
                          <Form.Label>Status</Form.Label>
                          <Form.Control as="select">
                            <option>Applied</option>
                            <option>Interview Scheduled</option>
                            <option>Offer Received</option>
                            <option>Rejected</option>
                          </Form.Control>
                        </Form.Group>
                        <Button className='mt-4' variant="secondary" type="submit">
                          Add Application
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>My Job Applications</Card.Title>
                      <ListGroup>
                        {jobApplications.map(application => (
                          <ListGroup.Item key={application.id}>
                            <strong>{application.companyName}</strong> - {application.position} ({application.status})
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </main>
          )}

          {isAuthenticated && <ResumeCoverLetter />}
          
          {!isAuthenticated && (
            <div className="text-center mt-5">
              <h3>Please log in to view content</h3>
              <Button onClick={() => loginWithRedirect()} variant="primary" className="mt-3">
                Log In
              </Button>
            </div>
          )}
          
          <footer>
            {/* Footer content */}
          </footer>
          
        </Col>
      </Row>
    </Container>
  );
}

export default App;
