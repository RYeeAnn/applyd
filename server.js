// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3002;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL configuration
const client = new Client({
  user: 'ryan',
  host: 'localhost',
  database: 'applications', // Your PostgreSQL database name
  password: '1231',
  port: 5432, // Default PostgreSQL port
});

client.connect();

// Route to handle insertion of job applications
app.post('/api/jobApplications', async (req, res) => {
  const { company_name, position, status, user_id } = req.body; // Extract user_id from request body
  try {
    const result = await client.query(
      'INSERT INTO job_applications (company_name, position, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [company_name, position, status, user_id] // Include user_id in SQL query
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting job application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle fetching of job applications
app.get('/api/jobApplications', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM job_applications');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle deletion of a job application
app.delete('/api/jobApplications/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await client.query('DELETE FROM job_applications WHERE id = $1', [id]);
    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error) {
    console.error('Error deleting job application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle updating the status of a job application
app.put('/api/jobApplications/:id/status', async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const result = await client.query(
      'UPDATE job_applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rowCount === 0) {
      // If no job application was found with the given id
      return res.status(404).json({ error: 'Job application not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating job application status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
