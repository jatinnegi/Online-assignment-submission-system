import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { gradeStudentAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";

const GradeAssignment = ({ gradeStudentAssignment }) => {
  let history = useHistory();
  const { assignment_id, student_id } = useParams();

  const [formData, setFormData] = useState({
    grade: "O",
    remarks: "",
  });

  const { grade, remarks } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    gradeStudentAssignment(formData, assignment_id, student_id);
    history.push(`/assignments/${assignment_id}`);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <h2 className="mb-3">Grade Assignment</h2>
        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => onChange(e)}
            name="grade"
            className="form-control"
          >
            <option value="O">O</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B+</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Remarks">Remarks</label>
          <textarea
            rows="5"
            value={remarks}
            onChange={(e) => onChange(e)}
            name="remarks"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

GradeAssignment.propTypes = {
  gradeStudentAssignment: PropTypes.func.isRequired,
};

export default connect(null, { gradeStudentAssignment })(GradeAssignment);
