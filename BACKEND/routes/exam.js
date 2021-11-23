const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/authenticate");

const {
  createExam,
  getExam,
  updateExam,
  deleteExam,
  submitExam,
} = require("../controllers/Exam");

router.get("/:id", authenticate, getExam);
router.post("/", authenticate, createExam);
router.put("/:id", authenticate, updateExam);
router.delete("/:id", authenticate, deleteExam);
router.post("/submit", authenticate, submitExam);

module.exports = router;
