import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AuthContext from "../helpers/AuthContext";
import UserContext from "../helpers/UserContext";
import Copyright from "../helpers/CopyRight"


// handling the styling
//*********************
const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));




//handling the create a user
// ***********************

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = () => {
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      phone_number: phone
    };

    axios
      .post("http://localhost:8001/api/register", newUser, {
        withCredentials: true
      })
      .then(res => {
        setAuth(true);
        setUser(res.data.user.id);
      })
      .catch(err => {
        console.error("Error logging in please try again", err);
        alert("Error logging in please try again");
      });
  };

  if (!auth) {
    return (
      <Grid container component="main" className={classes.root} maxwidth="xs">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAdd />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={event => event.preventDefault()}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="User Name"
                    autoFocus
                    onChange={event => setName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="phone_num"
                    name="phone_num"
                    variant="outlined"
                    required
                    fullWidth
                    id="phone_num"
                    label="Phone Number"
                    type="tel"
                    onChange={event => setPhone(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    variant="outlined"
                    name="email"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    onChange={event => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="current-password"
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    onChange={event => setPassword(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => handleSubmit()}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  } else return <Redirect to="/goals" />;
}
