import { deleteTeacherRequest } from "../actions/teacher";
import {
  GET_TEACHER_REQUESTS,
  TEACHER_REQUEST_DELETED,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEACHER_REQUESTS:
      return payload;

    case TEACHER_REQUEST_DELETED:
      return state.filter((request) => request._id !== payload);

    default:
      return state;
  }
}
