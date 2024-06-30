const express = require('express'); // Importing the Express framework
const bodyParser = require('body-parser'); // Importing body-parser to parse JSON bodies
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interaction
const app = express(); // Creating an Express application

// MongoDB connection string from environment variable or local MongoDB instance
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gpa_calculator';

// Connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas'); // Success message
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB Atlas:', err); // Error message
    });

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Importing routes from the courses module
const courses = require('./routes/courses');
// Using the imported routes for any requests to /api/courses
app.use('/api/courses', courses);

// Setting the port from environment variable or default to 3000
const port = process.env.PORT || 3000;
// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Server start message
});
