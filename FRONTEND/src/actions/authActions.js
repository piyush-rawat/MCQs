import axios from "axios";

import {
  GOOGLE_OAUTH,
  GOOGLE_OAUTH_FAIL,
  GET_USER,
  LOGOUT,
} from "../constants/authConstants";

export const googleOAuth = (googleResponse) => async (dispatch) => {
  if (googleResponse == "") {
    dispatch({ type: GOOGLE_OAUTH, payload: [] });
  } else {
    dispatch({ type: GOOGLE_OAUTH, payload: googleResponse });
  }
};

export const authenticateGoogleToken = (token) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/auth/google",
      { token },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response.data);
    dispatch({ type: GOOGLE_OAUTH, payload: response.data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: GOOGLE_OAUTH_FAIL });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const response = await axios.get("/auth/getUser", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    dispatch({ type: GET_USER, payload: response.data.user });
  } catch (error) {
    dispatch({ type: LOGOUT });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
