const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  roll: { type: Number, required: true },
  year: { type: String, required: true },
  course: { type: String, required: true },
  assignments: [
    {
      assignment_id: { type: Schema.Types.ObjectId, required: true },
      teacherName: { type: String, required: true },
      subject: { type: String, required: true },
      title: { type: String, required: true },
      deadline: { type: Date, required: true },
      filename: { type: String, required: true },
      studentfilename: { type: String },
      submitted_date: { type: Date },
      grade: { type: String },
      remarks: { type: String },
      pending: { type: Boolean, default: true },
      late_submission: { type: Boolean },
    },
  ],
});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
