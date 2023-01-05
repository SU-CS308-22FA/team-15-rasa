import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

export default function SigninJournal() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("password")) {
      alert("Invalid email or password");
      return;
    }
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
        console.log(res.data.items[0].confirmed);
        if (res.data.items[0].confirmed === "true") {
          if (
            res &&
            (res.data.items.length === 0 ||
              res.data.items[0].password !== data.get("password"))
          ) {
            alert("Invalid email or password");
            return;
          }
          if (res) {
            if (location.state && location.state.from) {
              navigate(location.state.from, {
                state: { ...location.state, ...res.data.items[0] },
              });
            } else {
              navigate("/", {
                state: {
                  ...location.state,
                  ...res.data.items[0],
                  journalist: "true",
                },
              });
            }
          } else {
            alert("There was an error. Please try again.");
          }
        } else {
          alert("Your journalist account was not verified by our admins.");
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
            Sign in
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/">Home Page</Link>
              </Grid>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/signup">Sign up</Link>
              </Grid>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/forgotpassword">Forgot password?</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
