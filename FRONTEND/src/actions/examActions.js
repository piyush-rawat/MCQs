import axios from "axios";

import {
  GET_EXAM,
  GET_EXAM_FAILED,
  CREATE_EXAM,
  CREATE_EXAM_FAIL,
  SUBMIT_EXAM,
  SUBMIT_EXAM_FAIL,
  DELETE_EXAM,
} from "../constants/examConstants";

export const getExam = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/_exam/${id}`, {
      headers: {
        token: localStorage.token,
      },
    });
    if (response.data.exam) {
      dispatch({ type: GET_EXAM, payload: response.data.exam });
    } else {
      dispatch({ type: GET_EXAM_FAILED, payload: response.data.error_msg });
    }

    console.log("Success");
  } catch (error) {
    console.log(error);
    console.log("Failed");
    dispatch({ type: GET_EXAM_FAILED, payload: "Error Fetching Data" });
  }
};

export const createExam = (formData, props, enqueueSnackbar) => async (
  dispatch
) => {
  try {
    const response = await axios.post("/_exam", formData, {
      headers: {
        token: localStorage.token,
        "Content-Type": "application/json",
      },
    });
    if (response.data.exam) {
      dispatch({ type: CREATE_EXAM, payload: response.data.exam });
      enqueueSnackbar("Created new exam.", { variant: "success" });
      props.history.push("/");
    } else {
      dispatch({ type: CREATE_EXAM_FAIL });
      enqueueSnackbar("Sorry, something went wrong.", { variant: "error" });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_EXAM_FAIL });
    enqueueSnackbar("Sorry, something went wrong.", { variant: "error" });
  }
};

export const submitExam = (formData, id, enqueueSnackbar) => async (
  dispatch
) => {
  try {
    const response = await axios.post(
      "/_exam/submit",
      { formData, key: id },
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      }
    );
    if (response.data.error_msg) {
      dispatch({ type: SUBMIT_EXAM_FAIL, payload: response.data.error_msg });
      enqueueSnackbar("Submitted.", { variant: "success" });
    }
  } catch (error) {
    dispatch({ type: SUBMIT_EXAM_FAIL, payload: "Something went wrong." });
    enqueueSnackbar("Error", { variant: "error" });
  }
};

export const deleteExam = (key, enqueueSnackbar) => async (dispatch) => {
  try {
    const response = await axios.delete(`/_exam/${key}`, {
      headers: {
        token: localStorage.token,
      },
    });
    console.log(response);
    if (response.data.key) {
      console.log("I am here.");
      dispatch({ type: DELETE_EXAM, payload: response.data.key });
      enqueueSnackbar("Successfully deleted.", { variant: "success" });
    } else {
      enqueueSnackbar("Error", { variant: "error" });
    }
  } catch (error) {
    console.log(error);
    enqueueSnackbar("Error", { variant: "error" });
  }
};
