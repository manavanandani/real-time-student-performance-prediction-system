const express = require('express');
const router = express.Router();

const {
  getStudents,
  addStudent,
  updateStudent,
  predictScore
} = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.post('/predict-score', predictScore); // POST route to call FastAPI

module.exports = router;
