import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  let authLinks = null;

  if (user) {
    if (user.type === "admin") {
      authLinks = (
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-header">
              &lt;Online Submission /&gt;
            </Link>
            <ul className="user-links">
              <li>
                <Link to="/student/requests" className="links">
                  <small>Student Requests</small>
                </Link>
              </li>
              <li>
                <Link to="/teacher/requests" className="links">
                  <small>Teacher Requests</small>
                </Link>
              </li>
              <li>
                <Link to="/students" className="links">
                  <small>View all students</small>
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="links">
                  <small>View all teachers</small>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <small>{user.type}</small>
              </li>
              <li>
                <small>{user?.email}</small>
              </li>
              <li>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else if (user.type === "student") {
      authLinks = (
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-header">
              &lt;Online Submission /&gt;
            </Link>
            <ul className="user-links">
              <li>
                <Link to="/student/assignments" className="links">
                  <small>View all assignments</small>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <small>{user.type}</small>
              </li>
              <li>
                <small>{user?.email}</small>
              </li>
              <li>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      authLinks = (
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-header">
              &lt;Online Submission /&gt;
            </Link>
            <ul className="user-links">
              <li>
                <Link to="/assignments" className="links">
                  <small>View All Assignments</small>
                </Link>
              </li>
              <li>
                <Link to="/upload/assignment" className="links">
                  <small>Upload Assignment</small>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <small>{user.type}</small>
              </li>
              <li>
                <small>{user?.email}</small>
              </li>
              <li>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
  const guestLinks = (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-header">
          &lt;Online Submission /&gt;
        </Link>
        <ul>
          <li>
            <Link to="/register" className="nav-links">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  return isAuthenticated ? authLinks : guestLinks;
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
