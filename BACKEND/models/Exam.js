const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: String,
  },
  results: [
    {
      user_id: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      marksObtained: {
        type: String,
      },
      marksInPercent: {
        type: String,
      },
      submittedAt: {
        type: String,
      },
    },
  ],
  resultsCount: {
    type: Number,
  },
  key: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Exam", ExamSchema);
