import {
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";
import { setAlert } from "./alert";

import api from "../utils/api";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const studentRequest = (formData) => async (dispatch) => {
  const body = JSON.stringify(formData);

  try {
    const res = await api.post("/student/request", body);
    dispatch(
      setAlert(
        "Request sent. Confimation will be sent to your email",
        "success"
      )
    );
    window.scrollTo(0, 0);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
    window.scrollTo(0, 0);
  }
};

export const teacherRequest = (formData) => async (dispatch) => {
  const body = JSON.stringify(formData);

  try {
    const res = await api.post("/teacher/request", body);
    dispatch(
      setAlert(
        "Request sent. Confimation will be sent to your email",
        "success"
      )
    );
    window.scrollTo(0, 0);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
    window.scrollTo(0, 0);
  }
};

export const login = (formData) => async (dispatch) => {
  const body = JSON.stringify(formData);
  try {
    const res = await api.post("/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    api.defaults.headers.common["x-auth-token"] = res.data.token;
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
      } else {
        console.log(err);
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }

    window.scrollTo(0, 0);
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
