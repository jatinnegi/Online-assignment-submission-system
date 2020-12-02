import {
  GET_STUDENT_REQUESTS,
  STUDENT_REQUEST_DELETED,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STUDENT_REQUESTS:
      return payload;

    case STUDENT_REQUEST_DELETED:
      return state.filter((request) => request._id !== payload);

    default:
      return state;
  }
}
