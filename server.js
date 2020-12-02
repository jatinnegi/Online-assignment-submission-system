const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//middlewares
app.use(cors());
app.use(express.json({ extended: false }));

//connect database
const conn = connectDB();

conn.once("open", () => {
  console.log("MongoDB connection established successfully...");
});

app.get("/download", (req, res) => {
  const file = __dirname + "/uploads/sample.pdf";
  res.download(file);
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/student/request", require("./routes/api/studentRequest"));
app.use("/api/student", require("./routes/api/student"));
app.use("/api/teacher/request", require("./routes/api/teacherRequest"));
app.use("/api/teacher", require("./routes/api/teacher"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/assignment", require("./routes/api/assignment"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
