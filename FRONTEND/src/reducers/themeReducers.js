import { TOGGLE_THEME, TOGGLE_THEME_FAIL } from "../constants/themeConstants";

if (!localStorage.theme) {
  localStorage.setItem("theme", "light");
}

export const themeReducer = (state = { theme: localStorage.theme }, action) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      localStorage.setItem(
        "theme",
        localStorage.theme == "light" ? "dark" : "light"
      );
      if (localStorage.theme == "dark") {
        document.body.classList.toggle("lighttheme");
        document.body.classList.toggle("darktheme");
      } else {
        document.body.classList.toggle("lighttheme");
        document.body.classList.toggle("darktheme");
      }
      return { theme: localStorage.theme };
    }
    case TOGGLE_THEME_FAIL: {
      localStorage.setItem("theme", "light");
      return { theme: "light" };
    }
    default:
      return state;
  }
};
