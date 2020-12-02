import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

// Components
import PrivateRoute from "./routing/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Misc/Landing";
import NotFound from "./components/Misc/NotFound";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Alert from "./components/Misc/Alert";
import Dashboard from "./components/Misc/Dashboard";
import StudentRequests from "./components/Admin/StudentRequests";
import TeacherRequests from "./components/Admin/TeacherRequests";
import Students from "./components/Admin/Students";
import Teachers from "./components/Admin/Teachers";
import Assignments from "./components/Teachers/Assignments";
import Assignment from "./components/Teachers/Assignment";
import GradeAssignment from "./components/Teachers/GradeAssignment";
import UploadAssignment from "./components/Teachers/UploadAssignment";
import StudentAssignments from "./components/Student/StudentAssignments";
import SubmitAssignment from "./components/Student/SubmitAssignment";

// Redux
import store from "./store";
import { Provider } from "react-redux";

import "./App.css";

function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/student/requests"
                  component={StudentRequests}
                />
                <PrivateRoute
                  exact
                  path="/teacher/requests"
                  component={TeacherRequests}
                />
                <PrivateRoute exact path="/students" component={Students} />
                <PrivateRoute exact path="/teachers" component={Teachers} />
                <PrivateRoute
                  exact
                  path="/assignments"
                  component={Assignments}
                />
                <PrivateRoute
                  exact
                  path="/assignments/:id"
                  component={Assignment}
                />
                <PrivateRoute
                  exact
                  path="/assignments/:assignment_id/:student_id"
                  component={GradeAssignment}
                />
                <PrivateRoute
                  exact
                  path="/upload/assignment"
                  component={UploadAssignment}
                />
                <PrivateRoute
                  exact
                  path="/student/assignments"
                  component={StudentAssignments}
                />
                <PrivateRoute
                  exact
                  path="/student/assignments/:id"
                  component={SubmitAssignment}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
