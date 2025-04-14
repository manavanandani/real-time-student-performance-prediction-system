const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: true
  },
  study_hours: {
    type: Number,
    required: true
  },
  attendance: {
    type: Number,
    required: true
  },
  score: {
    type: Number
  }
});

module.exports = mongoose.model('Student', studentSchema);
