import React, { useState, useRef, useEffect } from "react";

import moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Button,
  Grid,
  TextField,
  makeStyles,
  Radio,
  Paper,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import { useSnackbar } from "notistack";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
  DateTimePicker,
} from "@material-ui/pickers";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import { createExam } from "../actions/examActions";
import { getUser } from "../actions/authActions";

const CreateAnExam = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const questionRef = useRef();
  const option1Ref = useRef();
  const option2Ref = useRef();
  const option3Ref = useRef();
  const option4Ref = useRef();
  const selectRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    questions: [],
    // date: "",
    startTime: "",
    endTime: "",
    timeLimit: "",
  });

  const [questions, setQuestions] = useState([]);

  const [showQuestionInputField, setShowQuestionInputField] = useState(true);

  const addQuestion = () => {
    setShowQuestionInputField(true);
  };

  const saveQuestion = () => {
    const errors = [];
    if (!questionRef.current.value) {
      errors.push(1);
      enqueueSnackbar("Question is required.", { variant: "error" });
    }
    if (!option1Ref.current.value) {
      errors.push(1);
      enqueueSnackbar("Option 1 is required", { variant: "error" });
    }
    if (!option2Ref.current.value) {
      errors.push(1);
      enqueueSnackbar("Option 2 is required.", { variant: "error" });
    }
    if (!option3Ref.current.value) {
      errors.push(1);
      enqueueSnackbar("Option 3 is required.", { variant: "error" });
    }
    if (!option4Ref.current.value) {
      errors.push(1);
      enqueueSnackbar("Option 4 is required.", { variant: "error" });
    }
    if (!selectRef.current.firstChild.value) {
      errors.push(1);
      enqueueSnackbar("Correct option is required.", { variant: "error" });
    }
    if (errors.length == 0) {
      setFormData({
        ...formData,
        questions: [
          ...questions,
          {
            question: questionRef.current.value,
            options: [
              option1Ref.current.value,
              option2Ref.current.value,
              option3Ref.current.value,
              option4Ref.current.value,
            ],
            answer:
              (selectRef.current.firstChild.value == "op1" &&
                option1Ref.current.value) ||
              (selectRef.current.firstChild.value == "op2" &&
                option2Ref.current.value) ||
              (selectRef.current.firstChild.value == "op3" &&
                option3Ref.current.value) ||
              (selectRef.current.firstChild.value == "op4" &&
                option4Ref.current.value),
          },
        ],
      });
      setQuestions([
        ...questions,
        {
          question: questionRef.current.value,
          options: [
            option1Ref.current.value,
            option2Ref.current.value,
            option3Ref.current.value,
            option4Ref.current.value,
          ],
          answer:
            (selectRef.current.firstChild.value == "op1" &&
              option1Ref.current.value) ||
            (selectRef.current.firstChild.value == "op2" &&
              option2Ref.current.value) ||
            (selectRef.current.firstChild.value == "op3" &&
              option3Ref.current.value) ||
            (selectRef.current.firstChild.value == "op4" &&
              option4Ref.current.value),
        },
      ]);
      setShowQuestionInputField(false);
    }
  };

  const onChangeCorrectOption = (e) => {
    console.log(e.target.value);
    selectRef.current.firstChild.value = e.target.value;
  };

  const QuestionInputField = () => {
    return (
      <>
        <Paper className={classes.paper}>
          <TextField
            // placeholder="Question"
            label="Question"
            InputLabelProps={textfieldLabelProps}
            inputProps={textfieldProps}
            fullWidth
            inputRef={questionRef}
            className={classes.textField}
          />
          <div>
            <TextField
              // placeholder="Option 1"
              label="Option 1"
              inputProps={textfieldProps}
              InputLabelProps={textfieldLabelProps}
              inputRef={option1Ref}
            />
          </div>
          <div>
            <TextField
              // placeholder="Option 2"
              label="Option 2"
              inputProps={textfieldProps}
              InputLabelProps={textfieldLabelProps}
              inputRef={option2Ref}
            />
          </div>
          <div>
            <TextField
              // placeholder="Option 3"
              label="Option 3"
              inputProps={textfieldProps}
              InputLabelProps={textfieldLabelProps}
              inputRef={option3Ref}
            />
          </div>
          <div>
            <TextField
              // placeholder="Option 4"
              label="Option 4"
              inputProps={textfieldProps}
              InputLabelProps={textfieldLabelProps}
              inputRef={option4Ref}
            />
          </div>

          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="age-native-simple"
              style={{ color: theme == "light" ? "#555" : "white" }}
            >
              Correct Option*
            </InputLabel>
            <Select
              native
              onChange={onChangeCorrectOption}
              style={{
                minWidth: "170px",
                color: theme == "light" ? "black" : "white",
              }}
              ref={selectRef}
            >
              <option
                style={{
                  background: theme == "light" ? "white" : "black",
                }}
                aria-label="None"
                value=""
              />
              <option
                style={{
                  background: theme == "light" ? "white" : "black",
                }}
                value="op1"
              >
                Option 1
              </option>
              <option
                style={{
                  background: theme == "light" ? "white" : "black",
                }}
                value="op2"
              >
                Option 2
              </option>
              <option
                style={{
                  background: theme == "light" ? "white" : "black",
                }}
                value="op3"
              >
                Option 3
              </option>
              <option
                style={{
                  background: theme == "light" ? "white" : "black",
                }}
                value="op4"
              >
                Option 4
              </option>
            </Select>
          </FormControl>

          <div>
            <Button
              variant="contained"
              disableRipple
              onClick={saveQuestion}
              classes={classes.btn_save}
            >
              Add
            </Button>
          </div>
        </Paper>
      </>
    );
  };

  const useStyles = makeStyles({
    paper: {
      padding: 20,
      margin: "10px 0",
      backgroundColor: theme == "light" ? "white" : "#222",
      color: theme == "light" ? "black" : "white",
    },
    formControl: {
      margin: "10px 0",
    },
    textField: {
      color: theme == "light" ? "black" : "white",
    },
    btn_save: {
      backgroundColor: theme == "light" ? "#222" : "#222",
    },
    btn_addQuestion: {
      backgroundColor: "#222",
    },
    btn_discard: {
      backgroundColor: "#d11",
      color: "white",
      marginRight: 10,
      "&:hover": {
        backgroundColor: "#b11",
      },
    },
    btn_createExam: {
      backgroundColor: theme == "light" ? "#132c33" : "#333",
      color: "white",
      margin: "50px 0",
      "&:hover": {
        backgroundColor: theme == "light" ? "#0f2327" : "#222",
      },
    },
  });

  const classes = useStyles();

  const onChangeTitle = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const deleteQuestion = (index) => {
    const newArray = [];
    for (let i = 0; i < questions.length; i++) {
      if (i != index) newArray.push(questions[i]);
    }
    setQuestions(newArray);
    setFormData({
      ...formData,
      questions: newArray,
    });
  };

  useEffect(() => {
    dispatch(getUser());

    window.onbeforeunload = (e) => {
      return "";
    };
  }, []);

  // Form Validation

  const { enqueueSnackbar } = useSnackbar();

  const validateFormData = () => {
    const errors = [];
    if (formData.title == "") {
      errors.push(1);
      enqueueSnackbar("Title is required.", { variant: "error" });
    }
    if (formData.questions.length == 0) {
      errors.push(1);
      enqueueSnackbar("Atleast one question is required.", {
        variant: "error",
      });
    }
    // if (formData.date == "") {
    //   errors.push(1);
    //   enqueueSnackbar("Date is required.", { variant: "error" });
    // }
    if (formData.startTime == "") {
      errors.push(1);
      enqueueSnackbar("Start time is required.", { variant: "error" });
    }
    if (formData.endTime == "") {
      errors.push(1);
      enqueueSnackbar("End time required.", { variant: "error" });
    }

    if (errors.length == 0) {
      console.log(formData);
      dispatch(createExam(formData, props, enqueueSnackbar));
      // setTimeout(()=>{ props.history.push("/");},2000)
      // props.history.push("/");
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const discardExam = () => {
    setShowModal(true);
  };

  const handleDisagree = () => {
    setShowModal(false);
  };

  const handleAgree = () => {
    setShowModal(false);
    props.history.push("/");
  };

  const textfieldProps = {
    style: {
      color: theme == "light" ? "black" : "white",
    },
  };

  const textfieldLabelProps = {
    style: {
      color: theme == "light" ? "#555" : "white",
    },
  };

  return (
    <>
      <Container maxWidth="sm">
        <TextField
          variant="outlined"
          fullWidth
          label="Title*"
          inputProps={textfieldProps}
          InputLabelProps={textfieldLabelProps}
          style={{ display: "block", margin: "10px 0" }}
          onChange={onChangeTitle}
          className={classes.textField}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <br />
          <DateTimePicker
            disablePast
            label="Start Time"
            inputProps={textfieldProps}
            InputLabelProps={textfieldLabelProps}
            value={startTime}
            onChange={(date) => {
              console.log(
                moment(date)
                  .utcOffset("+0530")
                  .format("MMMM Do hh:mm:00 a")
                  .toString()
              );
              setFormData({
                ...formData,
                startTime: moment(date)
                  .utcOffset("+0530")
                  .format("MMMM Do hh:mm:00 a")
                  .toString(),
              });
              setStartTime(date);
            }}
          />
          <br />
          <DateTimePicker
            disablePast
            label="End Time"
            inputProps={textfieldProps}
            InputLabelProps={textfieldLabelProps}
            value={endTime}
            onChange={(date) => {
              console.log(
                moment(date)
                  .utcOffset("+0530")
                  .format("MMMM Do hh:mm:00 a")
                  .toString()
              );
              setFormData({
                ...formData,
                endTime: moment(date)
                  .utcOffset("+0530")
                  .format("MMMM Do hh:mm:00 a")
                  .toString(),
              });
              setEndTime(date);
            }}
          />
        </MuiPickersUtilsProvider>
        {questions.map((q, index) => {
          return (
            <>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={11}>
                    <p>
                      Q{index + 1}) {q.question}
                    </p>
                  </Grid>
                  {/* <Grid item xs={1}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Grid> */}
                  <Grid item xs={1}>
                    <IconButton onClick={() => deleteQuestion(index)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                {q.options.map((op) => {
                  return (
                    <div key={Math.random()}>
                      <Radio
                        color="inherit"
                        value={op}
                        checked={op == q.answer}
                      />
                      <label>{op}</label>
                    </div>
                  );
                })}
              </Paper>
            </>
          );
        })}
        {showQuestionInputField && <QuestionInputField />}
        <Button variant="contained" onClick={addQuestion}>
          Add a question
        </Button>

        <Grid container justify="center">
          <Grid item>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              className={classes.btn_discard}
              onClick={discardExam}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className={classes.btn_createExam}
              onClick={validateFormData}
            >
              Create Test
            </Button>
          </Grid>
        </Grid>
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
            Are you sure you want to discard this test ?
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

export default CreateAnExam;
