import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllStudents, deleteStudent } from "../../actions/student";
import PropTypes from "prop-types";

const Students = ({ getAllStudents, students, deleteStudent }) => {
  useEffect(() => {
    getAllStudents();
  }, []);

  let FYBMS = [];
  students.forEach((student) => {
    if (student.year === "FY" && student.course === "BMS") FYBMS.push(student);
  });

  const SYBMS = [];
  students.forEach((student) => {
    if (student.year === "SY" && student.course === "BMS") SYBMS.push(student);
  });

  const TYBMS = [];
  students.forEach((student) => {
    if (student.year === "TY" && student.course === "BMS") TYBMS.push(student);
  });

  const FYBAF = [];
  students.forEach((student) => {
    if (student.year === "FY" && student.course === "BAF") FYBAF.push(student);
  });

  const SYBAF = [];
  students.forEach((student) => {
    if (student.year === "SY" && student.course === "BAF") SYBAF.push(student);
  });

  const TYBAF = [];
  students.forEach((student) => {
    if (student.year === "TY" && student.course === "BAF") TYBAF.push(student);
  });

  const FYBSCIT = [];
  students.forEach((student) => {
    if (student.year === "FY" && student.course === "BSC IT")
      FYBSCIT.push(student);
  });

  const SYBSCIT = [];
  students.forEach((student) => {
    if (student.year === "SY" && student.course === "BSC IT")
      SYBSCIT.push(student);
  });

  const TYBSCIT = [];
  students.forEach((student) => {
    if (student.year === "TY" && student.course === "BSC IT")
      TYBSCIT.push(student);
  });

  return (
    <>
      <h2 className="mt-4">FY BSC IT</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {FYBSCIT.length !== 0 ? (
            FYBSCIT.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="mt-4">SY BSC IT</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {SYBSCIT.length !== 0 ? (
            SYBSCIT.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className="mt-4">TY BSC IT</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {TYBSCIT.length !== 0 ? (
            TYBSCIT.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="mt-4">FY BMS</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {FYBMS.length !== 0 ? (
            FYBMS.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="mt-4">SY BMS</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {SYBMS.length !== 0 ? (
            SYBMS.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className="mt-4">TY BMS</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {TYBMS.length !== 0 ? (
            TYBMS.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className="mt-4">FY BAF</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {FYBAF.length !== 0 ? (
            FYBAF.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className="mt-4">SY BAF</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {SYBAF.length !== 0 ? (
            SYBAF.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className="mt-4">TY BAF</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
            <th>Year</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {TYBAF.length !== 0 ? (
            TYBAF.map((student) => (
              <tr key={student._id}>
                <td>{student.user.name}</td>
                <td>{student.user.email}</td>
                <td>{student.roll}</td>
                <td>{student.year}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student.user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2 className="text-center">No students</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

Students.propTypes = {
  getAllStudents: PropTypes.func.isRequired,
  students: PropTypes.array,
  deleteStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps, { getAllStudents, deleteStudent })(
  Students
);
