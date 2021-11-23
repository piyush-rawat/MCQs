import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Grid,
  Button,
  Paper,
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FileCopyIcon from "@material-ui/icons/FileCopy";

// import AddIcon from "@material-ui/icons/Add";
import AddIcon from "@material-ui/icons/Add";

import { useSnackbar } from "notistack";

import { getUser } from "../actions/authActions";
import { deleteExam } from "../actions/examActions";

const Dashboard = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const useStyles = makeStyles({
    btn_create: {
      backgroundColor: theme == "light" ? "#132c33" : "#333",
      color: "white",
      margin: "20px 0",
      "&:hover": {
        backgroundColor: theme == "light" ? "#0f2327" : "#222",
      },
    },
    paper: {
      margin: "20px 0",
      padding: "0 20px 20px 20px",
      // backgroundColor: theme == "light" ? "white" : "#222",
      backgroundColor: theme == "light" ? "#132c33" : "#222",
      // color: theme == "light" ? "black" : "white",
      color: theme == "light" ? "white" : "white",
      // "&:hover": {
      //   backgroundColor: theme == "light" ? "#333" : "#333",
      // },
    },
  });

  const classes = useStyles();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteExam = (key) => {
    setShowModal(true);
    setKey(key);
  };

  const handleDisagree = () => {
    setShowModal(false);
  };

  const handleAgree = () => {
    dispatch(deleteExam(key, enqueueSnackbar));
    setShowModal(false);
  };

  const handleCopyLink = (link) => {
    const el = document.createElement("textarea");
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    enqueueSnackbar("Link Copied to clipboard.", { variant: "success" });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container justify="center">
          <Button
            variant="contained"
            disableRipple
            className={classes.btn_create}
            startIcon={<AddIcon />}
            href="/createnew"
          >
            New Test
          </Button>
        </Grid>
        {user.exams.map(({ id, title, key, resultsCount }) => (
          <div key={id}>
            <Paper className={classes.paper} elevation={1}>
              <Grid container alignItems="center" style={{ marginBottom: 10 }}>
                <Grid item sm={11}>
                  <h4>{title}</h4>
                </Grid>
                <Grid item sm={1}>
                  <IconButton
                    color="inherit"
                    onClick={() => handleDeleteExam(key)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item sm={9}>
                  <TextField
                    variant="outlined"
                    value={`https://mcqtest.tk/exam/${key}`}
                  />
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      handleCopyLink(`https://mcqtest.tk/exam/${key}`)
                    }
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={3}>
                  <Badge badgeContent={resultsCount} color="primary">
                    <Button href={`/results/${key}`} variant="contained">
                      View Results
                    </Button>
                  </Badge>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </Container>
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this exam ?
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
  );
};

export default Dashboard;
