const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam");

router.get("/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const exam = await Exam.findOne({ key });

    if (!exam) {
      return res.json({ error_msg: "Exam do not exits." });
    }
    return res.json({ results: exam.results });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
