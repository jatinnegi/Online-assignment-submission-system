const mongoose = require("mongoose");
const config = require("config");

const mongoURI = config.get("mongoURI");

const connectDB = () => {
  try {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const conn = mongoose.connection;

    return conn;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
