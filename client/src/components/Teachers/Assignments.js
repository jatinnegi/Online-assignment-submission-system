import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllTeacherAssignments,
  deleteAssignment,
} from "../../actions/assignments";
import formatDate from "../../utils/formatDate";
import download from "downloadjs";
import PropTypes from "prop-types";

const Assignments = ({
  assignments,
  getAllTeacherAssignments,
  deleteAssignment,
}) => {
  let history = useHistory();

  useEffect(() => {
    getAllTeacherAssignments();
  }, []);

  const rowClickHandler = (e, id) => {
    history.push(`/assignments/${id}`);
  };

  const deleteHandler = (e, id) => {
    e.stopPropagation();
    deleteAssignment(id);
  };

  const downloadFile = async (e) => {
    e.stopPropagation();
    const res = await fetch("http://localhost:5000/api/download");
    const blob = await res.blob();
    download(blob, "test.pdf");
  };

  return (
    <>
      <h1 className="mb-4">All Assignments</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Subject</th>
            <th>Title</th>
            <th>Year</th>
            <th>Deadline</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.teacher.length === 0 ? (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">
                  You haven't uploaded any assignments
                </h2>
              </td>
            </tr>
          ) : (
            assignments.teacher.map((assignment) => (
              <tr
                key={assignment._id}
                className="table-row-select"
                onClick={(e) => rowClickHandler(e, assignment._id)}
              >
                <td>{assignment.subject}</td>
                <td>{assignment.title}</td>
                <td>{assignment.year}</td>
                <td>{formatDate(assignment.deadline)}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={(e) => downloadFile(e)}
                  >
                    Download
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deleteHandler(e, assignment._id)}
                  >
                    Delete
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

Assignments.propTypes = {
  getAllTeacherAssignments: PropTypes.func.isRequired,
  assignments: PropTypes.object.isRequired,
  deleteAssignment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assignments: state.assignment,
});

export default connect(mapStateToProps, {
  getAllTeacherAssignments,
  deleteAssignment,
})(Assignments);
