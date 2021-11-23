import axios from "axios";

import { GET_RESULTS, GET_RESULTS_FAIL } from "../constants/resultsConstants";

export const getResults = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/_results/${id}`);
    console.log(response.data);
    if (response.data.results) {
      dispatch({ type: GET_RESULTS, payload: response.data.results });
    } else {
      dispatch({ type: GET_RESULTS_FAIL });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_RESULTS_FAIL });
  }
};
