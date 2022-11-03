import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Container } from "@mui/material";
import axios from "axios";
import { LocationSearching } from "@mui/icons-material";

const theme = createTheme();

export default function ChangeEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email") || !data.get("new_email")) {
      return;
    }
    axios
      .put("/api/v1/users", {
        _id: location.state._id,
        username: location.state.username,
        email: data.get("new_email"),
        password: location.state.password,
      })
      .catch((err) => {
        console.log(err);

        console.log(location.state);
      })
      .then((res) => {
        console.log(res);
        location.state.email = data.get("new_email");
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "15vh" }}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography component="h1" variant="h5">
              Account Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div>
            <Container maxWidth="sm">
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
                  Edit Email Address
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  You can change your email address in this page.
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
                    label="Current Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="new_email"
                    label="New Email"
                    name="new_email"
                    autoComplete="new_email"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save Changes
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      {/* <Link to="/signup" href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link> */}
                      <Button
                        onClick={() =>
                          navigate("/usersettings", {
                            state: location.state,
                          })
                        }
                      >
                        {" "}
                        Return to user settings{" "}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </main>
      </Grid>
    </ThemeProvider>
  );
}
