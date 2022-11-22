import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Container } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
const theme = createTheme();

export default function ChangeEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    axios
      .delete("/api/v1/users", { data: location.state })
      .catch((err) => {
        console.log(err);

        console.log(location.state);
      })
      .then((res) => {
        console.log(res);
        console.log("foo");
        navigate("/");
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
                  Delete Account
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Are you sure you want to delete your account?
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Yes"
                  />
                  <FormControlLabel control={<Checkbox />} label="No" />
                </FormGroup>
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
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    autoFocus
                  />
                  <Button
                    type="danger"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Delete My Account
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      {/* <Link to="/signup" href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link> */}
                      <Button onClick={() => navigate("/usersettings")}>
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
