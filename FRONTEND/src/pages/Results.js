import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../actions/authActions";
import { getResults } from "../actions/resultActions";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  makeStyles,
} from "@material-ui/core";

const Results = () => {
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.result);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser);
    dispatch(getResults(id));
  }, []);

  const useStyles = makeStyles({
    thead: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <Container>
        <TableContainer
          component={Paper}
          style={{ marginTop: 20, minWidth: "400px" }}
        >
          <Table size="small">
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Marks Obtained</TableCell>
                <TableCell>Marks in Percent</TableCell>
                <TableCell>Submitted At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map(
                ({
                  name,
                  email,
                  marksObtained,
                  marksInPercent,
                  submittedAt,
                }) => (
                  <TableRow className={classes.row}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{marksObtained}</TableCell>
                    <TableCell>{marksInPercent}%</TableCell>
                    <TableCell>{submittedAt}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Results;
