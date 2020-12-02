import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";

const Dashboard = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Dashboard);
