const Student = require('../models/Student');
const redis = require('redis');
const axios = require('axios');

// Redis client
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

// GET /students
const getStudents = async (req, res) => {
  const cacheKey = 'all_students';

  try {
    const cachedStudents = await redisClient.get(cacheKey);
    if (cachedStudents) {
      console.log('Data from Redis Cache');
      return res.status(200).json(JSON.parse(cachedStudents));
    }

    const students = await Student.find();
    await redisClient.set(cacheKey, JSON.stringify(students), { EX: 300 });

    console.log('Data from MongoDB');
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /students
const addStudent = async (req, res) => {
  try {
    const { student_name, study_hours, attendance, score } = req.body;

    const newStudent = new Student({
      student_name,
      study_hours,
      attendance,
      score
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ message: 'Error creating student' });
  }
};

// PUT /students/:id
const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await redisClient.del('all_students');
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /students/predict-score using FastAPI
const predictScore = async (req, res) => {
  const { study_hours, attendance } = req.body;

  try {
    const response = await axios.post('http://localhost:8000/predict', {
      study_hours,
      attendance
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('Error calling FastAPI:', err.message);
    res.status(500).json({ error: 'Failed to predict score' });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  predictScore
};
