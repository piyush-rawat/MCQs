import { TOGGLE_THEME, TOGGLE_THEME_FAIL } from "../constants/themeConstants";

export const toggleTheme = () => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_THEME });
  } catch (error) {
    dispatch({ type: TOGGLE_THEME_FAIL });
  }
};
