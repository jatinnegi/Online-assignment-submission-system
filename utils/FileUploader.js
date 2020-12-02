const multer = require("multer");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `C:/users/jatin/dev/mern/online-assignment-submission-system/uploads/${req.user.id}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(
      null,
      `C:/users/jatin/dev/mern/online-assignment-submission-system/uploads/${req.user.id}`
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + "-" + uniqueSuffix;
    req.filename = filename;
    cb(null, filename);
  },
});

let upload = multer({ storage: storage });

module.exports = upload;
