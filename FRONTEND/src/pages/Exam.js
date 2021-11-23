import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import moment from "moment";

import Countdown from "react-countdown";

import {
  Container,
  Paper,
  Radio,
  Button,
  Grid,
  makeStyles,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { useSnackbar } from "notistack";

import { getExam, submitExam } from "../actions/examActions";
import { authenticateGoogleToken, getUser } from "../actions/authActions";

const Exam = () => {
  const dispatch = useDispatch();
  const { loading, exam, error_msg, success_msg } = useSelector(
    (state) => state.exam
  );
  const { theme } = useSelector((state) => state.theme);

  const { enqueueSnackbar } = useSnackbar();

  const {
    title,
    questions,
    timeLimit,
    currentTime,
    startTime,
    endTime,
    currentDate,
  } = exam;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const stateObject = {};

  questions.map((q) => {
    stateObject[`${q.question}`] = null;
  });

  const [formData, setFormData] = useState(stateObject);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getExam(id));
  }, []);

  const useStyles = makeStyles({
    paper: {
      padding: 20,
      margin: "10px 0",
      backgroundColor: theme == "light" ? "white" : "#222",
      color: theme == "light" ? "black" : "white",
    },
    spacing: {
      padding: 20,
      marginBottom: 10,
    },
    box: {
      height: "500px",
      // border: "1px solid black",
      textAlign: "center",
      display: "block",
      marginTop: "60px",
      margin: "auto",
    },
    grid: {
      border: "1px solid black",
    },
    spinner: {
      color: theme == "light" ? "#222" : "white",
    },
    countdown: {
      display: "inline",
      border: "1px solid black",
      marginTop: "30px",
    },
    btn_submit: {
      backgroundColor: "#132c33",
      "&:hover": {
        backgroundColor: "black",
      },
    },
  });

  const classes = useStyles();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDisagree = () => {
    setShowModal(false);
  };

  const handleAgree = () => {
    dispatch(submitExam(formData, id, enqueueSnackbar));
    setShowModal(false);
  };

  const handleSubmitExam = () => {
    setShowModal(true);
  };

  const Completionist = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const renderer = ({ total, days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      if (hours.toString().length == "1") hours = `0${hours}`;
      if (minutes.toString().length == "1") minutes = `0${minutes}`;
      if (seconds.toString().length == "1") seconds = `0${seconds}`;
      return (
        <span
          style={{
            background: "#3d84b8",
            borderRadius: "2px",
            padding: "5px",
            color: "white",
            display: "inline",
            marginTop: "30px",
          }}
        >
          {days}days:{hours}h:{minutes}m:{seconds}s
        </span>
      );
    }
  };

  if (error_msg) {
    if (error_msg.includes("Test has not started!")) {
      const msg = error_msg.split("&")[0];
      const currentTime = parseInt(error_msg.split("&")[1]);
      const startTime = parseInt(error_msg.split("&")[2]);

      console.log(msg);
      console.log(currentTime);
      console.log(startTime);

      return (
        <>
          <Box className={classes.box}>
            <h1 className={classes.spinner} style={{ width: "100%" }}>
              {msg}
            </h1>{" "}
            <Countdown
              date={currentTime + (startTime - currentTime)}
              renderer={renderer}
              className={classes.countdown}
            />
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.box}
          >
            <h1 className={classes.spinner}>{error_msg}</h1>
          </Box>
        </>
      );
    }
  }

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.box}
        >
          <CircularProgress className={classes.spinner} />
        </Box>
      ) : success_msg !== "" ? (
        <h1>{success_msg}</h1>
      ) : (
        <>
          <Container maxWidth="sm">
            <h1
              style={{
                textAlign: "center",
                margin: "20px 0 50px 0",
                fontWeight: 500,
                fontSize: "35px",
                color: theme == "light" ? "black" : "white",
              }}
            >
              {title}
            </h1>
            <p
              className="timer"
              style={{
                color: theme == "light" ? "black" : "white",
                boxShadow: theme == "light" && "0 2px 5px #ccc",
                backgroundColor: theme == "light" ? "white" : "#111",
              }}
            >
              Time Left{"  -  "}
              <Countdown
                date={currentTime + (endTime - currentTime)}
                renderer={renderer}
              />
            </p>

            <form onSubmit={onSubmit}>
              {questions.map(({ question, options }, index) => (
                <Paper
                  key={Math.random()}
                  elevation={3}
                  className={classes.paper}
                >
                  <div className={classes.spacing} key={Math.random()}>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginBottom: "10px",
                      }}
                    >
                      Q{index + 1}) {question}
                    </p>
                    {options.map((op) => (
                      <div key={Math.random()}>
                        <Radio
                          color="default"
                          name={question}
                          value={op}
                          onChange={onChange}
                          checked={formData[`${question}`] == op}
                        />
                        <label>{op}</label>
                      </div>
                    ))}
                  </div>
                </Paper>
              ))}
              <Grid container justify="center">
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  disableElevation
                  disableRipple
                  style={{
                    margin: "20px 0 50px 0",
                  }}
                  className={classes.btn_submit}
                  onClick={handleSubmitExam}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Container>

          <Dialog
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Please Confirm"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to submit ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDisagree} color="primary">
                Disagree
              </Button>
              <Button onClick={handleAgree} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Exam;
