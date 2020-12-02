import {
  GET_ALL_TEACHER_ASSIGNMENTS,
  GET_ALL_STUDENT_ASSIGNMENTS,
  STUDENT_ASSIGNMENTS,
  ASSIGNMENT_DELETE,
} from "../actions/types";

const initialState = {
  teacher: [],
  student: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_TEACHER_ASSIGNMENTS:
      return {
        ...state,
        teacher: payload,
      };

    case GET_ALL_STUDENT_ASSIGNMENTS:
      const sorted = payload.sort((a, b) => a.roll - b.roll);

      return {
        ...state,
        teacher: sorted,
      };

    case STUDENT_ASSIGNMENTS:
      return {
        ...state,
        student: payload,
      };

    case ASSIGNMENT_DELETE:
      return {
        ...state,
        teacher: state.teacher.filter(
          (assignment) => assignment._id !== payload
        ),
      };

    default:
      return state;
  }
}
