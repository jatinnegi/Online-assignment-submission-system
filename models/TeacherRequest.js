const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  course: { type: String, required: true }
});

const TeacherRequest = mongoose.model("teacher-request", TeacherRequestSchema);

module.exports = TeacherRequest;
