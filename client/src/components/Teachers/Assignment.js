import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getAllStudentAssignments } from "../../actions/assignments";
import formatDate from "../../utils/formatDate";
import PropTypes from "prop-types";

const Assignment = ({ getAllStudentAssignments, assignments }) => {
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    getAllStudentAssignments(id);
  }, []);

  const handleGradeClick = (assignment_id, student_id) => {
    history.push(`/assignments/${assignment_id}/${student_id}`);
    console.log(assignment_id);
    console.log(student_id);
  };

  const checkLateSubmission = (flag) => {
    if (flag === undefined) {
      return;
    } else if (flag === true) {
      return <span style={{ color: "red", fontWeight: "bold" }}>Yes</span>;
    } else {
      return <span style={{ color: "green", fontWeight: "bold" }}>No</span>;
    }
  };

  return (
    <>
      <h2 className="mb-4">Assignment</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Subject</th>
            <th>Title</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Submitted On</th>
            <th>Late Submission</th>
            <th>File</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.teacher.length === 0 ? (
            <tr>
              <td colSpan="12">
                <h2 className="text-center">
                  You haven't uploaded any assignments
                </h2>
              </td>
            </tr>
          ) : (
            assignments.teacher.map((assignment) => (
              <tr key={assignment.student_id} className="table-row-select">
                <td>{assignment.roll}</td>
                <td>{assignment.year}</td>
                <td>{assignment.course}</td>
                <td>{assignment.subject}</td>
                <td>{assignment.title}</td>
                <td>{formatDate(assignment.deadline)}</td>
                <td>{assignment.pending === true ? "Pending" : "Submitted"}</td>
                <td>
                  {assignment.submitted_date
                    ? formatDate(assignment.submitted_date)
                    : null}
                </td>
                <td>{checkLateSubmission(assignment.late_submission)}</td>
                <td>
                  {assignment.studentFile ? (
                    <a href={assignment.studentFile}>File</a>
                  ) : null}
                </td>
                <td>{assignment.grade}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      handleGradeClick(
                        assignment.assignment_id,
                        assignment.student_id
                      )
                    }
                  >
                    Grade
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

Assignment.propTypes = {
  getAllStudentAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  assignments: state.assignment,
});

export default connect(mapStateToProps, { getAllStudentAssignments })(
  Assignment
);
