import { GET_RESULTS, GET_RESULTS_FAIL } from "../constants/resultsConstants";

export const resultsReducer = (
  state = { loading: true, result: [] },
  action
) => {
  switch (action.type) {
    case GET_RESULTS: {
      return {
        loading: false,
        result: action.payload,
      };
    }
    case GET_RESULTS_FAIL: {
      return {
        loading: false,
        result: [],
      };
    }
    default:
      return state;
  }
};
