import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getTeacherRequests,
  deleteTeacherRequest,
} from "../../actions/teacher";
import PropTypes from "prop-types";

const TeacherRequests = ({
  getTeacherRequests,
  teacherRequests,
  deleteTeacherRequest,
}) => {
  useEffect(() => {
    getTeacherRequests();
  }, []);

  const acceptHandler = (id, name, email, password, course) => {
    const accepted = "true";
    const formData = { name, email, password, course, accepted };
    deleteTeacherRequest(id, formData);
  };

  const deleteHandler = (id, name, email, password, course) => {
    const accepted = "false";
    const formData = { name, email, password, course, accepted };
    deleteTeacherRequest(id, formData);
  };

  return (
    <>
      <h2 className="mb-3">All Teacher Requests</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Course</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teacherRequests.length ? (
            teacherRequests.map((request) => (
              <tr scope="row" key={request._id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.password}</td>
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

TeacherRequests.propTypes = {
  getTeacherRequests: PropTypes.func.isRequired,
  studentRequest: PropTypes.array,
  deleteTeacherRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacherRequests: state.teacherRequest,
});

export default connect(mapStateToProps, {
  getTeacherRequests,
  deleteTeacherRequest,
})(TeacherRequests);
