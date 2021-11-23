import {
  GET_EXAM,
  GET_EXAM_FAILED,
  CREATE_EXAM,
  CREATE_EXAM_FAIL,
  GET_RESULTS,
  GET_RESULTS_FAIL,
  SUBMIT_EXAM,
  SUBMIT_EXAM_FAIL,
} from "../constants/examConstants";

export const examReducer = (
  state = {
    loading: true,
    exam: { title: "", questions: [], results: [] },
    error_msg: "",
    success_msg: "",
  },
  action
) => {
  switch (action.type) {
    case GET_EXAM: {
      return {
        ...state,
        exam: action.payload,
        loading: false,
      };
    }
    case GET_EXAM_FAILED: {
      return {
        ...state,
        error_msg: action.payload,
        loading: false,
      };
    }
    case CREATE_EXAM: {
      return {
        loading: false,
        exam: action.payload,
      };
    }
    case CREATE_EXAM_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_RESULTS: {
      return {
        ...state,
        results: action.payload,
      };
    }
    case GET_RESULTS_FAIL: {
      return {
        ...state,
        results: [],
      };
    }
    case SUBMIT_EXAM: {
      return {
        ...state,
        loading: false,
        success_msg: action.payload,
      };
    }
    case SUBMIT_EXAM_FAIL: {
      return {
        ...state,
        error_msg: action.payload,
      };
    }
    default:
      return state;
  }
};
