import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { themeReducer } from "./reducers/themeReducers";
import { authReducer } from "./reducers/authenticationReducers";
import { examReducer } from "./reducers/examReducers";
import { resultsReducer } from "./reducers/resultsReducers";

const reducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  exam: examReducer,
  result: resultsReducer,
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
