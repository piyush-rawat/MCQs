import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  Paper,
  Box,
  Grid,
  Container,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { authenticateGoogleToken } from "../actions/authActions";

const Login = (props) => {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { theme } = themeState;

  const useStyles = makeStyles({
    grid: {
      // border: "1px solid black",
    },
    box: {
      // border: "1px solid black",
      height: 500,
    },
    paper: {
      padding: 30,
      backgroundColor: theme == "light" ? "#fff" : "#222",
    },
    formTitle: {
      color: theme == "light" ? "black" : "white",
    },
    btn_demo: {
      backgroundColor: "#4C8BF5",
      width: "200px",
      color: "white",
      marginTop: 30,
      marginBottom: 10,
      "&:hover": {
        backgroundColor: "#4C8BF5",
      },
    },
    btn_google: {
      backgroundColor: "#DE5246",
      width: "200px",
      color: "white",
      "&:hover": {
        backgroundColor: "#DE5246",
      },
    },
    link: {
      textDecoration: "none",
      margin: 5,
      color: theme == "light" ? "blue" : "#fff",
    },
  });

  function Copyright() {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ color: "#666" }}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://material-ui.com/"
          to="/"
          style={{
            textDecoration: "none",
            color: "#666",
          }}
        >
          MCQ Test
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const classes = useStyles();

  const responseGoogle = (response) => {
    dispatch(authenticateGoogleToken(response.tokenId));
  };

  return (
    <>
      <Box display="flex" alignItems="center" className={classes.box}>
        <Grid container justify="center" className={classes.grid}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container justify="center" className={classes.grid}>
              <h1 className={classes.formTitle}>LOGIN</h1>
            </Grid>
            <Grid item xs={12}>
              <GoogleLogin
                className={classes.btn_demo}
                clientId="410658443116-dk75s1961puq12o1gkuu1o7nlhi83ahs.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
                prompt="consent"
              />
            </Grid>
          </Paper>
        </Grid>
      </Box>

      <Box mt={1} mb={4}>
        <Copyright />
      </Box>
    </>
  );
};

export default Login;
