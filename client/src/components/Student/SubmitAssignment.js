import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { submitAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";

const SubmitAssignment = ({ submitAssignment }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAssignment(file, id);
  };

  return (
    <>
      <h2 className="mb-4">Submit assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file">Upload Your File:</label>
          <input
            type="file"
            id="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            className="form-control-file"
          />
        </div>
        <button type="submit" className="mt-3 btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

SubmitAssignment.propTypes = {
  submitAssignment: PropTypes.func.isRequired,
};

export default connect(null, { submitAssignment })(SubmitAssignment);
