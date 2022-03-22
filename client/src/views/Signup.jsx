import { Box, Button, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");

  const { register, updateprofile } = useAuth();

  let navigate = useNavigate();

  function changeEmail(e) {
    setemail(e.target.value);
  }

  function changePass(e) {
    setpass(e.target.value);
  }

  function navHome() {
    navigate("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast("Processing your request");
    register(email, password)
      .then((userCredentials) => {
        {
          var username = userCredentials.user.email.split("@")[0];
        }
        updateprofile(username);
        toast.dismiss();
        console.log(userCredentials);
        toast.success("Signup Successful");
        setTimeout(navHome, 1500);
      })
      .catch((err) => toast(err.message));
  };

  return (
    // <Box
    //   sx={{
    //     marginTop: 9,
    //     marginInline: 25,
    //     width: "50%",
    //   }}
    // >
    //   <Typography variant="h1">Sign Up</Typography>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email : </label>
    //     <br />
    //     <TextField
    //       required
    //       placeholder="abc@gmail.com"
    //       name="title"
    //       small="true"
    //       fullWidth
    //       value={email}
    //       onChange={changeEmail}
    //     />
    //     <br />
    //     <label htmlFor="password">Password : </label>
    //     <br />
    //     <TextField
    //       required
    //       type="password"
    //       name="password"
    //       small="true"
    //       fullWidth
    //       value={password}
    //       onChange={changePass}
    //     />
    //     <br />
    //     <label htmlFor="username">Username : </label>
    //     <br />
    //     <TextField
    //       required
    //       name="username"
    //       small="true"
    //       fullWidth
    //       value={username}
    //       onChange={changeUsername}
    //     />
    //     <br />
    //     <br />

    //     <Button variant="contained" color="success" type="submit">
    //       SignUp
    //     </Button>
    //   </form>
    //   <ToastContainer autoClose={5000} />
    // </Box>

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={changeEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={changePass}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer closeButton={true} autoClose={5000} draggable={true} />
    </ThemeProvider>
  );
}

export default Signup;
