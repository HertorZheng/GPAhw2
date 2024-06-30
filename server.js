const express = require('express'); // Importing the Express framework
const bodyParser = require('body-parser'); // Importing body-parser to parse JSON bodies
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interaction
const path = require('path'); // Importing path for handling and transforming file paths
const app = express(); // Creating an Express application

// MongoDB connection string from MongoDB Atlas
const mongoURI = 'mongodb+srv://hectorzheng4:Hector7126216!@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
app.use(express.static(path.join(__dirname, 'public')));

// Mock database for courses (replace with actual database logic)
const courses = [
    { name: 'Math', grade: 'A', credits: 3 },
    { name: 'Science', grade: 'B', credits: 4 }
];

// API route to fetch courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// Setting the port from environment variable or default to 3000
const port = process.env.PORT || 3000;
// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Server start message
});
