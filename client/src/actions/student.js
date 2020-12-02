import {
  GET_ALL_STUDENTS,
  GET_STUDENT_REQUESTS,
  STUDENT_REQUEST_DELETED,
  DELETE_STUDENT,
} from "./types";
import api from "../utils/api";

export const getStudentRequests = () => async (dispatch) => {
  try {
    const res = await api.get("/student/request");
    dispatch({
      type: GET_STUDENT_REQUESTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteStudentRequest = (id, formData) => async (dispatch) => {
  const body = JSON.stringify(formData);
  console.log(body, id);
  try {
    const res = await api.post(`/student/request/${id}`, body);
    dispatch({
      type: STUDENT_REQUEST_DELETED,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllStudents = () => async (dispatch) => {
  try {
    const res = await api.get("/student");
    dispatch({
      type: GET_ALL_STUDENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/student/${id}`);
    dispatch({
      type: DELETE_STUDENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
