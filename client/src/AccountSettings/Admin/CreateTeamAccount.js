import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";

const theme = createTheme();

export default function CreateTeamAccount() {
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
                  _collection: "team_accounts",
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
                      .post("/api/v1", {
                          _collection: "team_accounts",
                          username: data.get("username"),
                          email: data.get("email"),
                          password: data.get("password"),
                      })
                      .catch((err) => {
                          console.log(err);
                      })
                      .then((res) => {
                          if (res && res.status === 200) {
                              alert("Account created.");
                              navigate("/adminpanel");
                          } else {
                              alert("An error occurred while signing up, please try again.");
                          }
                      });
              }
          });
    };

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Rasa Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
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
              Create Team Account
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
                Create
              </Button>
            </Box>
          </Box>
    </ThemeProvider>
  );
}
