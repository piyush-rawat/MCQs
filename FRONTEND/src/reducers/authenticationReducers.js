import { GOOGLE_OAUTH, GET_USER, LOGOUT } from "../constants/authConstants";
import { DELETE_EXAM } from "../constants/examConstants";

export const authReducer = (
  state = {
    isAuthenticated: localStorage.token ? true : false,
    user: { _id: "", exams: [] },
    token: localStorage.token,
  },
  action
) => {
  switch (action.type) {
    case GOOGLE_OAUTH: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: localStorage.token ? true : false,
        user: action.payload,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    }
    case DELETE_EXAM: {
      return {
        ...state,
        user: {
          ...state.user,
          exams: state.user.exams.filter((e) => e.key !== action.payload),
        },
      };
    }
    default:
      return state;
  }
};
