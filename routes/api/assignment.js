const express = require("express");
const fs = require("fs");
const auth = require("../../middleware/auth");
const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const User = require("../../models/User");
const FileUploader = require("../../utils/FileUploader.js");
const { check, validationResult } = require("express-validator/check");

const router = express.Router({ strict: true });

// @route   GET /api/assignment
// @desc    Get all assignments of the user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.type === "teacher") {
      const teacher = await Teacher.findOne({ user: req.user.id });
      const assignments = teacher.assignments;
      res.send(assignments);
    } else {
      const student = await Student.findOne({ user: req.user.id });
      const assignments = student.assignments;
      res.send(assignments);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/assignment/submitted
// @desc    Get submitted assignments of the student
// @access  Private
router.get("/submitted", auth, async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    let assignments = [];

    student.assignments.map((assignment) => {
      if (!assignment.pending) {
        assignments.push(assignment);
      }
    });

    res.send(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/assignment/add
// @desc    Add a new assignment
// @access  Private
router.post("/add", [auth, FileUploader.single("file")], async (req, res) => {
  const { subject, title, year, deadline } = req.body;
  const filepath = `C:/users/jatin/dev/mern/online-assignment-submission-system/uploads/${req.user.id}/${req.filename}`;

  console.log(subject, title, year, deadline);
  console.log(req.file);

  res.send("/post request");

  if (!subject || !title || !year || !deadline) {
    fs.unlinkSync(filepath);

    return res
      .status(400)
      .json({ errors: [{ msg: "All fields are required" }] });
  }

  const newAssignment = {
    subject,
    title,
    year,
    deadline,
    filename: filepath,
  };

  try {
    const teacher = await Teacher.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);

    const course = teacher.course;
    const teacherName = user.name;

    const students = await Student.find({ year, course });

    teacher.assignments.unshift(newAssignment);
    await teacher.save();

    const assignment_id = teacher.assignments[0]._id;

    newAssignment.teacherName = teacherName;
    newAssignment.assignment_id = assignment_id;

    students.map(async (student) => {
      student.assignments.unshift(newAssignment);
      await student.save();
    });

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/assignment/:id
// @desc    Get all assignments of students using assignment id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id });
    const course = teacher.course;
    let year;

    teacher.assignments.forEach((assignment) => {
      if (assignment._id.toString() === req.params.id) {
        year = assignment.year;
      }
    });

    const students = await Student.find({ year, course });

    let assignments = [];

    students.forEach((student) => {
      student.assignments.forEach((assignment) => {
        let studentInfo = {};

        if (assignment.assignment_id.toString() === req.params.id) {
          studentInfo.roll = student.roll;
          studentInfo.course = student.course;
          studentInfo.year = student.year;
          studentInfo.student_id = student._id;
          studentInfo.title = assignment.title;
          studentInfo.subject = assignment.subject;
          studentInfo.deadline = assignment.deadline;
          studentInfo.studentFile = assignment.studentfilename;
          studentInfo.pending = assignment.pending;
          studentInfo.grade = assignment.grade;
          studentInfo.assignment_id = assignment.assignment_id;
          studentInfo.submitted_date = assignment.submitted_date;
          studentInfo.late_submission = assignment.late_submission;
          assignments.push(studentInfo);
        }
      });
    });

    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   Post /api/assignment/grade/:assignment_id/:student_id
// @desc    Grade a student assignment
// @access  Private
router.post(
  "/grade/:assignment_id/:student_id",
  [auth, [check("grade", "Enter grade for student").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const student = await Student.findById(req.params.student_id);
      student.assignments.forEach((assignment) => {
        if (assignment.assignment_id.toString() === req.params.assignment_id) {
          assignment.grade = req.body.grade;
          assignment.remarks = req.body.remarks;
        }
      });

      await student.save();

      return res.status(200).json(student);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   POST /api/assignment/:id
// @desc    Submit assignment
// @access  Private
router.post("/:id", [auth, FileUploader.single("file")], async (req, res) => {
  const studentfilename = `C:/users/dev/jatin/mern/online-assignment-submission-system/uploads/${req.user.id}/${req.filename}`;

  try {
    const student = await Student.findOne({ user: req.user.id });
    student.assignments.forEach((assignment) => {
      if (assignment._id.toString() === req.params.id) {
        assignment.studentfilename = studentfilename;
        assignment.pending = false;
        assignment.submitted_date = new Date();
        let deadline = Date(assignment.deadline);
        assignment.late_submission = assignment.submitted_date > deadline;
      }
    });
    await student.save();

    res.send("/submitted");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   DELETE /api/assignment/delete/:assignment_id
// @desc    Delete an assignment
// @access  Private
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id });
    const course = teacher.course;

    let year;
    let removeIndex;

    teacher.assignments.forEach((assignment, index) => {
      if (assignment._id.toString() === req.params.id) {
        removeIndex = index;
        year = assignment.year;
      }
    });

    const students = await Student.find({ course, year });

    teacher.assignments.splice(removeIndex, 1);
    await teacher.save();

    students.map((student) => {
      student.assignments.forEach(async (assignment, index) => {
        if (assignment.assignment_id.toString() === req.params.id) {
          removeIndex = index;
        }
        student.assignments.splice(removeIndex, 1);
        await student.save();
      });
    });
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
