const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const config = require("config");
var nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const StudentRequest = require("../../models/StudentRequest");
const User = require("../../models/User");
const TeacherRequest = require("../../models/TeacherRequest");
const Teacher = require("../../models/Teacher");

// @route   GET api/teacher/request
// @desc    Get all teacher requests
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const users = await TeacherRequest.find();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/teacher/request
// @desc    Post a teacher request
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({
      min: 6
    }),
    check("course", "Course is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, course } = req.body;

    try {
      const user = await User.findOne({ email });
      const student_request = await StudentRequest.findOne({ email });
      const teacher_request = await TeacherRequest.findOne({ email });

      if (user || student_request || teacher_request) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already registered" }] });
      }

      const newTeacherRequest = new TeacherRequest({
        name,
        email,
        password,
        course
      });

      await newTeacherRequest.save();

      res.send("Teacher request sent");
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server error");
    }
  }
);

// @route   POST api/teacher/request/:id
// @desc    Delete a teacher request
// @access  Public
router.post("/:id", async (req, res) => {
  try {
    const teacher_request = await TeacherRequest.findById(req.params.id);
    const { name, email, password, course, accepted } = req.body;

    if (!teacher_request) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Teacher request not found" }] });
    }

    if (accepted === "true") {
      const newUser = new User({ name, email, password, type: "teacher" });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);

      await newUser.save();

      const user = newUser.id;

      const newTeacher = new Teacher({ user, course });
      await newTeacher.save();

      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "admn.online.submission@gmail.com",
          pass: config.get("emailPassword")
        },
        tlsL: {
          rejectUnauthorized: false
        }
      });

      let HelperOptions = {
        from: '"Jatin Negi" <admn.online.submission@gmail.com>',
        to: `${email}`,
        subject: "Online assignment submission system",
        html: `<p>Your request for online assignment submission system has been accepted.</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Password: ${password}</li>
        </ul>`
      };

      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });

      res.send("Teacher added!");
    } else {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
          user: "admn.online.submission@gmail.com",
          pass: config.get("emailPassword")
        },
        tlsL: {
          rejectUnauthorized: false
        }
      });

      let HelperOptions = {
        from: '"Jatin Negi" <admn.online.submission@gmail.com',
        to: `${email}`,
        subject: "Online assignment submission system",
        text:
          "Your request for online assignment submission system has been rejected. Please try again later"
      };

      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("The message was sent!");
        console.log(info);
      });

      res.send("Teacher request denied!");
    }

    await teacher_request.remove();

    res.send("Teacher request removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
