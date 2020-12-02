const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const Student = require("../../models/Student");
const User = require("../../models/User");

// @route   GET api/student
// @desc    Get all students
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find().populate("user", ["email", "name"]);

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/student
// @desc    Register a student
// @access  Public
router.post("/", async (req, res) => {
  let { name, email, password, roll, year, course } = req.body;
  const type = "student";

  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password, type });
    let user = await newUser.save();

    user = user.id;

    const newStudent = new Student({ user, roll, year, course });

    await newStudent.save();

    res.send("Student registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/student/:id
// @desc    Delete a student
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.params.id });
    const user = await User.findById(req.params.id);

    if (!student || !user) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    await student.remove();
    await user.remove();

    res.send("Student removed");
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId");
    return res.status(500).send("Server error");
  }
  res.status(500).send("Server error");
});
module.exports = router;
