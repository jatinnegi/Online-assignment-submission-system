import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getStudentRequests,
  deleteStudentRequest,
} from "../../actions/student";
import PropTypes from "prop-types";

const StudentRequests = ({
  getStudentRequests,
  studentRequests,
  deleteStudentRequest,
}) => {
  useEffect(() => {
    getStudentRequests();
  }, []);

  const acceptHandler = (id, name, email, password, roll, year, course) => {
    const accepted = "true";
    const formData = { name, email, password, roll, year, course, accepted };
    deleteStudentRequest(id, formData);
  };

  const deleteHandler = (id, name, email, password, roll, year, course) => {
    const accepted = "false";
    const formData = { name, email, password, roll, year, course, accepted };
    deleteStudentRequest(id, formData);
  };

  return (
    <>
      <h2 className="mb-3">All Student Requests</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Roll</th>
            <th scope="col">Year</th>
            <th scope="col">Course</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentRequests.length ? (
            studentRequests.map((request) => (
              <tr scope="row" key={request._id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.password}</td>
                <td>{request.roll}</td>
                <td>{request.year}</td>
                <td>{request.course}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm mr-3"
                    onClick={() =>
                      acceptHandler(
                        request._id,
                        request.name,
                        request.email,
                        request.password,
                        request.roll,
                        request.year,
                        request.course
                      )
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteHandler(
                        request._id,
                        request.name,
                        request.email,
                        request.password,
                        request.roll,
                        request.year,
                        request.course
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <h2 className="text-center">No new requests</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

StudentRequests.propTypes = {
  getStudentRequests: PropTypes.func.isRequired,
  studentRequest: PropTypes.array,
  deleteStudentRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  studentRequests: state.studentRequest,
});

export default connect(mapStateToProps, {
  getStudentRequests,
  deleteStudentRequest,
})(StudentRequests);
