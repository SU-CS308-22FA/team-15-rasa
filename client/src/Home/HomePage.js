import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Divider, List, ListItemButton} from '@mui/material';
import UserMenu from "../UserMenu/UserMenu";

const theme = createTheme();

export default function HomePage() {
    const location = useLocation();
    const navigate = useNavigate();

  return (
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
              my: 3,
              mx: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {UserMenu()}
          </Box>
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
              Welcome to RASA
            </Typography>
            <List
              sx={{ mt: 3, mb: 2 }}
              scomponent="nav"
              aria-label="mailbox folders"
            >
              <ListItemButton>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/surveyvisuals")}
                >
                  Surveys
                </Button>
              </ListItemButton>
              <Divider />
              <ListItemButton divider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() =>
                    navigate("/standfix", { state: location.state })
                  }
                >
                  Fixture and Standings
                </Button>
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() =>
                    navigate("/refereedata", { state: location.state })
                  }
                >
                  Referee stats
                </Button>
              </ListItemButton>

              {location.state && location.state.username ? (
                <ListItemButton>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() =>
                      navigate("/survey", { state: location.state })
                    }
                  >
                    Take the survey
                  </Button>
                </ListItemButton>
              ) : (
                <></>
              )}
            </List>
          </Box>
          <Box
            sx={{
              my: 3,
              mx: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {!(location.state && location.state.username) ? (
              <>
                <Link to="/adminlogin">Admin Login Page</Link>
                <Link to="/teamlogin">Team Login Page</Link>
              </>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
