import { GET_ALL_STUDENTS, DELETE_STUDENT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_STUDENTS:
      return payload;

    case DELETE_STUDENT:
      return state.filter((student) => student.user._id !== payload);

    default:
      return state;
  }
}
