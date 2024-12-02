const express = require('express');
const cors = require('cors'); // Import cors
const { connect_to_database } = require('./mongodb');
const Contact = require('./Contact_Scheema'); // Importing the model
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connect_to_database();

// POST route to handle contact form data
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate request body
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

    // Create a new Contact document
    const newContact = new Contact({ name, email, message });

    // Save the document to the database
    await newContact.save();

    res.status(201).json({ success: true, message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
