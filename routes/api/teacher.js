const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const Teacher = require("../../models/Teacher");
const User = require("../../models/User");

// @route   GET api/teacher
// @desc    Get all teachers
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user", ["email", "name"]);

    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/teacher
// @desc    Register a teacher
// @access  Public
router.post("/", async (req, res) => {
  let { name, email, password, course } = req.body;
  const type = "teacher";

  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password, type });
    let user = await newUser.save();

    user = user.id;

    const newTeacher = new Teacher({ user, course });

    await newTeacher.save();

    res.send("Teacher registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/teacher/:id
// @desc    Delete a teacher
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.params.id });
    const user = await User.findById(req.params.id);

    if (!teacher || !user) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    await teacher.remove();
    await user.remove();

    res.send("Teacher removed");
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId");
    res.status(500).send("Server error");
  }
});
module.exports = router;
