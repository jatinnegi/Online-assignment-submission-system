import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllTeachers, deleteTeacher } from "../../actions/teacher";
import PropTypes from "prop-types";

const Teachers = ({ getAllTeachers, teachers, deleteTeacher }) => {
  useEffect(() => {
    getAllTeachers();
  }, []);

  let BMS = [];
  teachers.forEach((teacher) => {
    if (teacher.course === "BMS") BMS.push(teacher);
  });

  let BAF = [];
  teachers.forEach((teacher) => {
    if (teacher.course === "BAF") BAF.push(teacher);
  });

  let BSCIT = [];
  teachers.forEach((teacher) => {
    if (teacher.course === "BSC IT") BSCIT.push(teacher);
  });

  return (
    <>
      <h2 className="mt-4">BSC IT</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {BSCIT.length !== 0 ? (
            BSCIT.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.user.name}</td>
                <td>{teacher.user.email}</td>
                <td>{teacher.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTeacher(teacher.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <h2 className="text-center">No teachers</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="mt-4">BMS</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {BMS.length !== 0 ? (
            BMS.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.user.name}</td>
                <td>{teacher.user.email}</td>
                <td>{teacher.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTeacher(teacher.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <h2 className="text-center">No teachers</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="mt-4">BAF</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {BAF.length !== 0 ? (
            BAF.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.user.name}</td>
                <td>{teacher.user.email}</td>
                <td>{teacher.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTeacher(teacher.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <h2 className="text-center">No teachers</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

Teachers.propTypes = {
  getAllTeachers: PropTypes.func.isRequired,
  teachers: PropTypes.array,
  deleteTeacher: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teachers: state.teachers,
});

export default connect(mapStateToProps, { getAllTeachers, deleteTeacher })(
  Teachers
);
