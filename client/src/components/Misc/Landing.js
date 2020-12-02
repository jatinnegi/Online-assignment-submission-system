import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="landing">
      <div className="description">
        <h2>Welcome to Online Assignment Submission System</h2>
        <p>
          An online assignment submission and assignment grading portal for
          students and teachers
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary btn-lg">
            Register
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
