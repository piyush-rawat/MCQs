import React, { Suspense, lazy } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { Provider } from "react-redux";
import store from "./store";

import { SnackbarProvider } from "notistack";

const Navbar = lazy(() => import("./components/Navbar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateTest = lazy(() => import("./pages/CreateTest"));
const Exam = lazy(() => import("./pages/Exam"));
const Results = lazy(() => import("./pages/Results"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));

if (localStorage.theme == "dark") {
  document.body.classList.add("darktheme");
}
if (localStorage.theme == "light") {
  document.body.classList.add("lighttheme");
}

const Fallback = () => {
  const useStyles = makeStyles({
    box: {
      height: "100vh",
    },
  });

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.box}
      >
        <CircularProgress style={{ color: "#132c33" }} />
      </Grid>
    </>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<Fallback />}>
            <Navbar />
            <Switch>
              <SnackbarProvider maxSnack={5}>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/createnew" component={CreateTest} />
                <PrivateRoute exact path="/exam/:id" component={Exam} />
                <PrivateRoute exact path="/results/:id" component={Results} />
              </SnackbarProvider>
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </>
  );
}

export default App;
