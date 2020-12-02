import {
  GET_ALL_TEACHER_ASSIGNMENTS,
  GET_ALL_STUDENT_ASSIGNMENTS,
  STUDENT_ASSIGNMENTS,
  ASSIGNMENT_DELETE,
} from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";
import axios from "axios";

export const getAllTeacherAssignments = () => async (dispatch) => {
  try {
    const res = await api.get("/assignment");
    dispatch({
      type: GET_ALL_TEACHER_ASSIGNMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentAssignments = () => async (dispatch) => {
  try {
    const res = await api.get("/assignment");
    dispatch({
      type: STUDENT_ASSIGNMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllStudentAssignments = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/assignment/${id}`);
    dispatch({
      type: GET_ALL_STUDENT_ASSIGNMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const gradeStudentAssignment = (
  formData,
  assignment_id,
  student_id
) => async (dispatch) => {
  const body = JSON.stringify(formData);
  try {
    await api.post(`/assignment/grade/${assignment_id}/${student_id}`, body);
    dispatch(setAlert("Assignment updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const uploadAssignment = (formData) => (dispatch) => {
  let bodyFormData = new FormData();
  bodyFormData.append("file", new Blob([formData.file], { type: "pdf" }));
  bodyFormData.append("subject", formData.subject);
  bodyFormData.append("title", formData.title);
  bodyFormData.append("year", formData.year);
  bodyFormData.append("deadline", formData.deadline);

  axios({
    method: "post",
    url: "http://localhost:5000/api/assignment/add",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      dispatch(setAlert("Assignment uploaded", "success"));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const submitAssignment = (file, id) => (dispatch) => {
  let bodyFormData = new FormData();
  bodyFormData.append("file", new Blob([file], { type: "pdf" }));

  axios({
    method: "post",
    url: `http://localhost:5000/api/assignment/${id}`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      dispatch(setAlert("Assignment submitted", "success"));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteAssignment = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/assignment/delete/${id}`);
    dispatch({
      type: ASSIGNMENT_DELETE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
