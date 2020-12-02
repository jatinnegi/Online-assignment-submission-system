import {
  GET_ALL_TEACHERS,
  GET_TEACHER_REQUESTS,
  TEACHER_REQUEST_DELETED,
  DELETE_TEACHER,
} from "./types";
import api from "../utils/api";

export const getTeacherRequests = () => async (dispatch) => {
  try {
    const res = await api.get("/teacher/request");
    dispatch({
      type: GET_TEACHER_REQUESTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTeacherRequest = (id, formData) => async (dispatch) => {
  const body = JSON.stringify(formData);
  console.log(body, id);
  try {
    const res = await api.post(`/teacher/request/${id}`, body);
    dispatch({
      type: TEACHER_REQUEST_DELETED,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllTeachers = () => async (dispatch) => {
  try {
    const res = await api.get("/teacher");
    dispatch({
      type: GET_ALL_TEACHERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTeacher = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/teacher/${id}`);
    dispatch({
      type: DELETE_TEACHER,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
