const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", async (req, res) => {
  let { name, email, password, type } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already registered" }] });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password, type });
    await newUser.save();

    res.send("User registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/users
// @desc    Delete a user
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No user found" }] });
    }

    await user.remove();

    res.send("User deleted");
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "No user found" }] });
    }
    res.status(500).send("Server error");
  }
});
module.exports = router;
