const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  course: { type: String, required: true },
  assignments: [
    {
      subject: { type: String, required: true },
      title: { type: String, required: true },
      year: { type: String, required: true },
      deadline: { type: Date, required: true },
      filename: { type: String, required: true },
    },
  ],
});

const Teacher = mongoose.model("teacher", TeacherSchema);

module.exports = Teacher;
