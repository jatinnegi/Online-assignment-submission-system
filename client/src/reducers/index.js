import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import studentRequest from "./studentRequest";
import teacherRequest from "./teacherRequest";
import students from "./students";
import teachers from "./teachers";
import assignment from "./assignment";

export default combineReducers({
  auth,
  alert,
  studentRequest,
  teacherRequest,
  students,
  teachers,
  assignment,
});
