const axios = require("axios");
const { v4 } = require("uuid");

const User = require("../models/User");
const Exam = require("../models/Exam");

const moment = require("moment");

exports.createExam = async (req, res) => {
  const { user_id } = req.headers;
  const { title, questions, date, startTime, endTime, timeLimit } = req.body;
  let user = await User.findById(user_id);
  try {
    const exam = await Exam.create({
      user: user._id,
      title,
      questions,
      date,
      startTime,
      endTime,
      timeLimit,
      key: v4() + "-" + v4(),
      resultsCount: 0,
    });
    user.exams.unshift({
      title: exam.title,
      exam_id: exam._id,
      key: exam.key,
      resultsCount: 0,
    });
    await user.save();
    return res.json({ exam });
  } catch (error) {
    console.log(error);
    return res.json({ error_msg: "Error" });
  }
};

exports.getExam = async (req, res) => {
  const { id } = req.params;

  const { user_id } = req.headers;

  let exam;
  try {
    exam = await Exam.findOne({ key: id });

    // Check if test exists.
    if (!exam) {
      return res.json({ error_msg: "Invalid link!" });
    }

    // Check if already submitted.
    let isAlreadySubmitted;
    if (exam.results.length > 0) {
      exam.results.map((r) => {
        if (r.user_id == user_id) {
          isAlreadySubmitted = true;
        }
      });
    }

    if (isAlreadySubmitted) {
      return res.json({ error_msg: "Successfully Submitted" });
    }

    // Check date and time

    const currentDate = moment().utcOffset("+0530").format("YYYY-MM-DD");
    const examDate = exam.date;
    const timeFormat = "MMMM Do hh:mm:00 a";
    // const currentTime = moment().utcOffset("+0530").format("HH:mm:ss");
    const currentTime = moment().utcOffset("+0530");

    const examStartTime = moment(exam.startTime, timeFormat).subtract(
      "5.5",
      "hours"
    );
    const examEndTime = moment(exam.endTime, timeFormat).subtract(
      "5.5",
      "hours"
    );

    console.log("Current Time - ", currentTime.valueOf());

    console.log("Exam Start Time - ", examStartTime.valueOf());
    console.log("Exam End time - ", examEndTime.valueOf());

    if (moment(currentTime).isBefore(examStartTime)) {
      return res.json({
        error_msg: `Test has not started!&${moment()
          .utcOffset("+0530")
          .valueOf()}&${examStartTime.valueOf()}`,
      });
    }

    if (moment(currentTime).isBetween(examStartTime, examEndTime)) {
      exam = exam.toObject();
      exam.questions.map((question) => {
        delete question.answer;
      });

      exam.currentTime = moment().valueOf();

      exam.endTime = moment(exam.endTime, "MMMM Do hh:mm:00 a")
        .subtract("5.5", "hours")
        .valueOf();

      return res.json({ exam });
    }

    if (moment(currentTime).isAfter(examEndTime)) {
      return res.json({ error_msg: "This test is over!" });
    }
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return res.json({ error_msg: "Invalid link!" });
    }
    return res.status(500).json({ error_msg: "Server Error." });
  }
};
exports.updateExam = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.headers;
  const { title, questions, timeLimit } = req.body;
  console.log(title, questions, timeLimit);
  let user = await User.findById(user_id);
  try {
    const update = { title, questions, timeLimit };
    const exam = await Exam.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    const newExamArray = [];
    user.exams.map((e) => {
      if (e.exam_id.toString() == id.toString()) {
        e.title = title;
      }
      newExamArray.push(e);
    });
    user.exams = newExamArray;
    await user.save();
    return res.json({ exam });
  } catch (error) {
    console.log(error);
    return res.json({ error_msg: "Error" });
  }
};
exports.deleteExam = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.headers;

  try {
    let exam;
    let user;
    exam = await Exam.findOneAndDelete({ key: id });
    if (!exam) {
      return res.json({ error_msg: "Exam does not exist." });
    }
    user = await User.findById(user_id);
    let newExamArray = [];

    user.exams.map((e) => {
      if (e.key.toString() !== id.toString()) {
        console.log(e.exam_id, id);
        newExamArray.push(e);
      }
    });
    // console.log("newExamArray", newExamArray);
    user.exams = newExamArray;
    await user.save();
    return res.json({ key: exam.key });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_msg: "Server Error" });
  }
};

exports.submitExam = async (req, res) => {
  const { user_id } = req.headers;
  const { formData, key } = req.body;

  // Check if already submitted
  try {
    const exam = await Exam.findOne({ key });

    // console.log(exam);

    if (!exam) {
      return res.json({ error_msg: "Invalid link!" });
    }

    // console.log("exam", exam.results);

    let isAlreadySubmitted;
    exam.results.map((r) => {
      if (r.user_id.toString() == user_id.toString()) {
        isAlreadySubmitted = true;
      }
    });

    if (isAlreadySubmitted) {
      return res.json({ error_msg: "Successfully Submitted" });
    }
  } catch (error) {
    console.log(error);
  }

  let user;

  try {
    user = await User.findById(user_id.toString());
    // console.log(user);
  } catch (error) {
    console.log(error);
  }

  try {
    const exam = await Exam.findOne({ key });
    if (exam) {
      // console.log("Exam found");
    } else {
      return console.log("Exam not found");
    }

    const currentTime = moment().utcOffset("+0530").toString();

    if (moment(currentTime).isAfter(moment(exam.endTime))) {
      return res.json({ error_msg: "This test is over!" });
    }

    const time = moment().utcOffset("+0530").format("HH:mm");
    const hour = time.split(":")[0];
    const minute = time.split(":")[1];
    // console.log(hour);
    let h;
    let meridiem;
    switch (hour) {
      case "00": {
        h = "12";
        meridiem = "A.M.";
        break;
      }
      case "01": {
        h = "1";
        meridiem = "A.M.";
        break;
      }
      case "02": {
        h = "2";
        meridiem = "A.M.";
        break;
      }
      case "03": {
        h = "3";
        meridiem = "A.M.";
        break;
      }
      case "04": {
        h = "4";
        meridiem = "A.M.";
        break;
      }
      case "05": {
        h = "5";
        meridiem = "A.M.";
        break;
      }
      case "06": {
        h = "6";
        meridiem = "A.M.";
        break;
      }
      case "07": {
        h = "7";
        meridiem = "A.M.";
        break;
      }
      case "08": {
        h = "8";
        meridiem = "A.M.";
        break;
      }
      case "09": {
        h = "9";
        meridiem = "A.M.";
        break;
      }
      case "10": {
        h = "10";
        meridiem = "A.M.";
        break;
      }
      case "11": {
        h = "11";
        meridiem = "A.M.";
        break;
      }
      case "12": {
        h = "12";
        meridiem = "P.M.";
        break;
      }
      case "13": {
        h = "1";
        meridiem = "P.M.";
        break;
      }
      case "14": {
        h = "2";
        meridiem = "P.M.";
        break;
      }
      case "15": {
        h = "3";
        meridiem = "P.M.";
        break;
      }
      case "16": {
        h = "4";
        meridiem = "P.M.";
        break;
      }
      case "17": {
        h = "5";
        meridiem = "P.M.";
        break;
      }
      case "18": {
        h = "6";
        meridiem = "P.M.";
        break;
      }
      case "19": {
        h = "7";
        meridiem = "P.M.";
        break;
      }
      case "20": {
        h = "8";
        meridiem = "P.M.";
        break;
      }
      case "21": {
        h = "9";
        meridiem = "P.M.";
        break;
      }
      case "22": {
        h = "10";
        meridiem = "P.M.";
        break;
      }
      case "23": {
        h = "11";
        meridiem = "P.M.";
        break;
      }
    }

    const t = h + ":" + minute + " " + meridiem;

    let marksObtained = 0;
    let totalMarks = 0;

    exam.questions.map((q) => {
      totalMarks++;
      const answer = formData[`${q.question}`];
      if (answer == q.answer) {
        // console.log("Correct Answer");
        marksObtained++;
      } else {
        // console.log("Wrong Asnwer");
      }
    });

    const marksInPercent = (marksObtained / totalMarks) * 100;

    exam.results.push({
      user_id: user._id,
      name: user.name,
      email: user.email,
      marksObtained: `${marksObtained}/${totalMarks}`,
      marksInPercent,
      submittedAt: t,
    });
    await exam.save();

    const admin = await User.findOne({ "exams.key": key });
    // if (admin) {
    //   console.log("Admin Found");
    // } else {
    //   console.log("Admin not found");
    // }
    admin.exams.map((e) => {
      if (e.key == key) {
        e.resultsCount = parseInt(e.resultsCount) + 1;
      }
    });

    await admin.save();
    return res.json({ error_msg: "Successfully submitted." });
  } catch (error) {
    console.log(error);
    return res.json({ error_msg: "Something went wrong." });
  }
};
