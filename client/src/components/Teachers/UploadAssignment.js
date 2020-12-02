import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { uploadAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";

const UploadAssignment = ({ uploadAssignment }) => {
  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    year: "FY",
    deadline: new Date(),
    file: "",
  });

  const { subject, title, year, deadline, file } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    uploadAssignment(formData);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deadlineChangeHandler = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  return (
    <>
      <h2 className="mb-4">Upload new assignment</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            name="subject"
            value={subject}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Year</label>
          <select
            value={year}
            name="year"
            onChange={(e) => changeHandler(e)}
            className="form-control"
          >
            <option value="FY">FY</option>
            <option value="SY">SY</option>
            <option value="TY">TY</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <br />
          <DatePicker
            id="deadline"
            className="form-control"
            selected={deadline}
            onChange={deadlineChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">File</label>
          <br />
          <input
            type="file"
            className="form-control-file"
            name="file"
            value={file}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </>
  );
};

UploadAssignment.propTypes = {
  uploadAssignment: PropTypes.func.isRequired,
};

export default connect(null, { uploadAssignment })(UploadAssignment);
