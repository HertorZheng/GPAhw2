const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: String,
    grade: String,
    credits: Number
});

module.exports = mongoose.model('Course', CourseSchema);
