import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import LZString from "lz-string";
const theme = createTheme();

export default function SignupJournal() {
  let [state, setState] = useState({
    _collection: "",
    username: "",
    email: "",
    password: "",
    image: "",
    confirmed: "false",
  });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("username") || !data.get("email") || !data.get("password")) {
      alert("Invalid username, email or password");
      return;
    }
    state = {
      ...state,
      _collection: "journalists",
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    axios
      .get("/api/v1", {
        params: {
          _collection: "journalists",
          email: data.get("email"),
        },
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res && res.data.items.length !== 0) {
          alert("Email already exists");
          return;
        }
        if (res) {
          axios
            .post("/api/v1", state)
            .catch((err) => {
              console.log(err);
            })
            .then((res) => {
              if (res && res.status === 200) {
                navigate("/signin");
              } else {
                alert("An error occurred while signing up, please try again.");
              }
            });
        }
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://www.evrensel.net/upload/dosya/167821.jpg)",
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="user"
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
            />
            <div>
              Upload a photo of your journalist ID
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setState({
                    ...state,
                    image: base64,
                  })
                }
              />
              <img src="data:image/png;base64," />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/signin">Have an account? Sign in</Link>
              </Grid>
              <Grid item>
                <Link to="/signupjournal">Sign up as a journalist</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
