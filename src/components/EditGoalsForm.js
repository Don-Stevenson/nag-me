import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MaterialUIPickers from "./Picker";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import GoalsContext from "../helpers/GoalsContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  typo: {
    marginTop: theme.spacing(3)
  }
}));

//function that handles editing the goals
//**************************************/
export default function EditGoals(props) {
  const classes = useStyles();

  const getNagName = async () => {
    const result = await axios.get("http://localhost:8001/api/nags", {
      withCredentials: true
    });

    const nagArray = Object.keys(result.data).map(nag => {
      return result.data[nag];
    });

    var nagName = nagArray.find(obj => {
      return obj.goal_id === goalId
    })

    setNag(nagName.nag_name);
  };

  useEffect(() => {
    getNagName();
  }, []);

  const { goals, setGoals } = useContext(GoalsContext);
  const [goalId, setGoalId] = useState(props.id || "");
  const [goal, setGoal] = useState(props.name || "");
  const [nag, setNag] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phone1, setPhone1] = useState(props.friend1 || "");
  const [phone2, setPhone2] = useState(props.friend2 || "");

  const startDate = new Date();

  let history = useHistory();

  const submitMe = e => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8001/api/goals/edit",
        { goalId, goal, startDate, endDate, phone1, phone2, nag },
        { withCredentials: true }
      )
      .then(res => {
        console.log("I am the response data:", res.data);
      });

    history.push("/nags");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.form}>
            Edit Goals
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={submitMe}
          >
            <TextField
              id="outlined-basic"
              label="Goal Title"
              variant="outlined"
              fullWidth
              value={goal}
              margin="normal"
              onChange={e => setGoal(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Nag Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nag}
              onChange={e => setNag(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="First Friend Phone: "
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone1}
              onChange={e => setPhone1(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Second Friend Phone: "
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone2}
              onChange={e => setPhone2(e.target.value)}
            />
            <h2>Completion Date</h2>
            <MaterialUIPickers
              initialEndDate={props.endDate}
              updateDate={d => {
                setEndDate(d);
              }}
            />
            <Button
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={props.dismiss}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
