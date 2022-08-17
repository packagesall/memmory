import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom'
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/authActions";

const initialState ={
  firstName :'',lastName:'',email:'',password:'',confirmPassword :''
}



const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "84834513789-i37vtegtgtkop63tq4dptf8j1g96h9mu.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    if(isSignup){
      dispatch(signup(formData,navigate))
    } else {
      dispatch(signin(formData,navigate))
    }

  };

  const handleChange = (e) => {
   setFormData({...formData,[e.target.name]:e.target.value})
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    // console.log("Succ ", res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {}
  };

  const googleFailure = (err) => {
    alert("google failure");
    console.log("Unsuucessful - ", err);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">
          {" "}
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign UP" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="84834513789-i37vtegtgtkop63tq4dptf8j1g96h9mu.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                 disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
