// App.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon
import './App.scss';
import Sidebar from './components/Sidebar';
import ResumeCoverLetter from './components/ResumeCoverLetter';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

interface JobApplication {
  id: number;
  company_name: string;
  position: string;
  status: string;
  submitted_at: string;
}

function App() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [newApplication, setNewApplication] = useState({
    company_name: '',
    position: '',
    status: 'Applied',
    user_id: isAuthenticated ? user?.sub : ''
  });
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get<JobApplication[]>('http://localhost:3002/api/jobApplications');
      setJobApplications(response.data);
      console.log('Job applications:', response.data); // Log the job applications data
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewApplication({ ...newApplication, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Get the current date and time
    const submitted_at = new Date().toISOString();
    
    // Check if any of the fields are empty
    if (!newApplication.company_name || !newApplication.position || !newApplication.status) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    
    try {
      // Include the submitted_at field in the newApplication object
      const applicationData = { ...newApplication, submitted_at };
      
      // Send the POST request to add the job application
      await axios.post('http://localhost:3002/api/jobApplications', applicationData);
      
      // Fetch the updated list of job applications after adding a new application
      fetchJobApplications();
      
      // Clear the form fields and set the status to 'Applied'
      setNewApplication({ company_name: '', position: '', status: 'Applied', user_id: user ? user.sub : '' });
      
      console.log('Job application added successfully');
    } catch (error) {
      console.error('Error adding job application:', error);
    }
  };
  

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:3002/api/jobApplications/${id}/status`, { status: newStatus });
      // Fetch the updated list of job applications after status update
      fetchJobApplications();
      console.log('Job application status updated successfully');
    } catch (error) {
      console.error('Error updating job application status:', error);
    }
  };  

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3002/api/jobApplications/${id}`);
        // Fetch the updated list of job applications after deletion
        fetchJobApplications();
        console.log('Job application deleted successfully');
      } catch (error) {
        console.error('Error deleting job application:', error);
      }
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  return (
    <Container fluid className="App">
      <Row>
        {isAuthenticated && (
          <Col md={2} className="sidebar-container">
            <Sidebar />
          </Col>
        )}
        <Col md={isAuthenticated ? 10 : 12}>
          {isAuthenticated && (
            <main>
              <Row>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Add New Job Application</Card.Title>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="company_name">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control type="text" name="company_name" value={newApplication.company_name} onChange={handleInputChange} placeholder="Enter company name" />
                        </Form.Group>
                        <Form.Group controlId="position">
                          <Form.Label>Position</Form.Label>
                          <Form.Control type="text" name="position" value={newApplication.position} onChange={handleInputChange} placeholder="Enter position" />
                        </Form.Group>
                        <Form.Group controlId="status">
                          <Form.Label>Status</Form.Label>
                          <Form.Control as="select" name="status" value={newApplication.status} onChange={handleInputChange}>
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
                      {jobApplications.map(application => (
                        <ListGroup.Item key={application.id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{application.company_name}</strong> - {application.position} <strong>({application.status})</strong>
                            </div>
                            <div>{application.submitted_at}</div>
                            <div className='d-flex align-items-center'>
                              {/* Dropdown menu for selecting status */}
                              <Form.Control as="select" value={application.status} onChange={(e) => handleStatusChange(application.id, e.target.value)}>
                                <option>Applied</option>
                                <option>Interview Scheduled</option>
                                <option>Offer Received</option>
                                <option>Rejected</option>
                              </Form.Control>
                              <Button variant="link" onClick={() => handleDelete(application.id)}><FaTrash /></Button>
                            </div>
                          </div>
                          
                        </ListGroup.Item>
                      ))}
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
              <Button onClick={() => loginWithRedirect()} variant="secondary" className="mt-3">
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
