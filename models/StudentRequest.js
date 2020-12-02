const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roll: { type: Number, required: true },
  year: { type: String, required: true },
  course: { type: String, required: true }
});

const StudentRequest = mongoose.model("student-request", StudentRequestSchema);

module.exports = StudentRequest;
