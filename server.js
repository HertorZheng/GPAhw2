const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static('public'));

const courses = require('./routes/courses');
app.use('/api/courses', courses);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
