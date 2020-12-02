import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { studentAssignments } from "../../actions/assignments";
import formatDate from "../../utils/formatDate";
import PropTypes from "prop-types";

const StudentAssignments = ({ studentAssignments, assignments }) => {
  let history = useHistory();

  useEffect(() => {
    studentAssignments();
  }, []);

  const submitHandler = (id) => {
    history.push(`/student/assignments/${id}`);
  };

  return (
    <>
      <h2>Assignments</h2>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Deadline</th>
            <th>File</th>
            <th>Status</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length !== 0 ? (
            assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.title}</td>
                <td>{assignment.subject}</td>
                <td>{formatDate(assignment.deadline)}</td>
                <td>
                  <a href={assignment.filename}>File</a>
                </td>
                <td>{assignment.pending ? "Pending" : "Submitted"}</td>
                <td>{assignment.grade ? assignment.grade : "Pending"}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => submitHandler(assignment._id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <h2 className="text-center">No new Assignments</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

StudentAssignments.propTypes = {
  studentAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.array,
};

const mapStateToProps = (state) => ({
  assignments: state.assignment.student,
});

export default connect(mapStateToProps, { studentAssignments })(
  StudentAssignments
);
