const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gpa_calculator';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB Atlas:', err);
    });

app.use(bodyParser.json());
app.use(express.static('public'));

const courses = require('./routes/courses');
app.use('/api/courses', courses);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
