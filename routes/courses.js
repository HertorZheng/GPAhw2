const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Add a new course
router.post('/', async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json(newCourse);
});

// Update a course
router.put('/:id', async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
});

// Delete a course
router.delete('/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
});

module.exports = router;
