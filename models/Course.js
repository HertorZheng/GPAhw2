const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema; // Creating a shorthand for mongoose.Schema

// Defining the schema for a course
const CourseSchema = new Schema({
    name: String, // Name of the course
    grade: String, // Grade received in the course
    credits: Number // Number of credits for the course
});

// Exporting the Course model based on CourseSchema
module.exports = mongoose.model('Course', CourseSchema);
