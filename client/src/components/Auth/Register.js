import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { studentRequest, teacherRequest } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({
  studentRequest,
  teacherRequest,
  setAlert,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    type: "student",
    roll: "",
    year: "FY",
    course: "BAF",
  });

  const {
    name,
    email,
    password,
    password2,
    type,
    roll,
    year,
    course,
  } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords don't match", "danger");
      window.scrollTo(0, 0);
    } else {
      if (type === "student") {
        studentRequest(formData);
      } else {
        teacherRequest(formData);
      }
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            placeholder="Password"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">You are?</label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={type}
            onChange={changeHandler}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        {type === "student" && (
          <div className="form-group">
            <label htmlFor="roll">Roll Number</label>
            <input
              type="number"
              autoComplete="off"
              className="form-control"
              id="roll"
              placeholder="Enter your roll number"
              name="roll"
              value={roll}
              onChange={changeHandler}
            />
          </div>
        )}
        {type === "student" && (
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              className="form-control"
              id="year"
              name="year"
              value={year}
              onChange={changeHandler}
            >
              <option value="FY">FY</option>
              <option value="SY">SY</option>
              <option value="TY">TY</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            className="form-control"
            id="course"
            name="course"
            value={course}
            onChange={changeHandler}
          >
            <option value="BAF">BAF</option>
            <option value="BMS">BMS</option>
            <option value="BSC IT">BSC IT</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <div>
          <Link to="/login" className="block">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  studentRequest: PropTypes.func.isRequired,
  teacherRequest: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  studentRequest,
  teacherRequest,
  setAlert,
})(Register);
