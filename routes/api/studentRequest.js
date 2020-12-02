const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
var nodemailer = require("nodemailer");
const config = require("config");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const StudentRequest = require("../../models/StudentRequest");
const User = require("../../models/User");
const Student = require("../../models/Student");
const TeacherRequest = require("../../models/TeacherRequest");

// @route   GET api/student/request
// @desc    Get all student requests
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const users = await StudentRequest.find();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/student/request
// @desc    Register a student request
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({
      min: 6,
    }),
    check("roll", "Roll number is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("course", "Course is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, roll, year, course } = req.body;

    try {
      const newStudentRequest = new StudentRequest({
        name,
        email,
        password,
        roll,
        year,
        course,
      });

      const user = await User.findOne({ email });
      let student_request = await StudentRequest.findOne({ email });
      const student = await Student.findOne({ roll, year, course });
      const teacher_request = await TeacherRequest.findOne({ email });

      if (user || student_request || teacher_request) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already registered" }] });
      }

      student_request = await StudentRequest.findOne({ roll, year, course });

      if (student || student_request) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Roll number already registered" }] });
      }

      await newStudentRequest.save();

      res.send("Student request sent");
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server error");
    }
  }
);

// @route   POST api/student/request/:id
// @desc    Delete a student request
// @access  Public
router.post("/:id", async (req, res) => {
  try {
    const student_request = await StudentRequest.findById(req.params.id);
    const { name, email, password, roll, year, course, accepted } = req.body;

    if (!student_request) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Student request not found" }] });
    }

    if (accepted === "true") {
      let newUser = new User({ name, email, password, type: "student" });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);

      await newUser.save();

      const user = newUser.id;

      const newStudent = new Student({ user, roll, year, course });
      await newStudent.save();

      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "admn.online.submission@gmail.com",
          pass: config.get("emailPassword"),
        },
        tlsL: {
          rejectUnauthorized: false,
        },
      });

      let HelperOptions = {
        from: '"Jatin Negi" <admn.online.submission@gmail.com>',
        to: `${email}`,
        subject: "Online assignment submission system",
        html: `<p>Your request for online assignment submission system has been accepted.</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Password: ${password}</li>
        </ul>`,
      };

      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });

      res.send("Student added!");
    } else {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "admn.online.submission@gmail.com",
          pass: config.get("emailPassword"),
        },
        tlsL: {
          rejectUnauthorized: false,
        },
      });

      let HelperOptions = {
        from: '"Jatin Negi" <admn.online.submission@gmail.com>',
        to: `${email}`,
        subject: "Online assignment submission system",
        html:
          "<p>Your request for online assignment submission system has been rejected. Please try again later</p>",
      };

      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });

      res.send("Student request denied!");
    }

    await student_request.remove();

    res.send("Student request removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
