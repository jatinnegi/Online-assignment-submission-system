import { GET_ALL_TEACHERS, DELETE_TEACHER } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TEACHERS:
      return payload;

    case DELETE_TEACHER:
      return state.filter((teacher) => teacher.user._id !== payload);

    default:
      return state;
  }
}
