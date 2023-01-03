import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { List, ListItemButton } from "@mui/material";
import UserMenu from "../UserMenu/UserMenu";
import MatchViewMenu from "./MatchViewMenu";

const theme = createTheme();

export default function HomePage({ stateChanger }) {
  const navigate = useNavigate();
  let [location, setLocation] = React.useState(useLocation());
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    if (!window.location.hash && location.state) {
      window.location = window.location + "#loaded";
      const locationState = location.state;
      window.localStorage.setItem(
        "locationState",
        JSON.stringify(locationState)
      );
      window.location.reload();
    }
    const themeUnparsed = window.localStorage.getItem("theme");
    stateChanger(themeUnparsed ? JSON.parse(themeUnparsed) : true);
    location.state = JSON.parse(window.localStorage.getItem("locationState"));
    setLocation(location);
    forceUpdate();
  }, []);

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
            my: 3,
            mx: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <UserMenu />
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
            <ListItemButton divider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>
                  navigate("/refassignmentvisualization", {
                    state: location.state,
                  })
                }
              >
                Referee Assignments
              </Button>
            </ListItemButton>
            <MatchViewMenu />
            <ListItemButton divider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>
                  navigate("/refereelistdetails", {
                    state: location.state,
                  })
                }
              >
                Referee List
              </Button>
            </ListItemButton>
            <ListItemButton divider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>
                  navigate("/refereerankings", {
                    state: location.state,
                  })
                }
              >
                Referee Rankings
              </Button>
            </ListItemButton>
            <ListItemButton divider>
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
            <ListItemButton divider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/standfix", { state: location.state })}
              >
                Fixture and Standings
              </Button>
            </ListItemButton>
            <ListItemButton divider>
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
            {location.state &&
            location.state.username &&
            location.state.journalist != "true" ? (
              <ListItemButton divider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/survey", { state: location.state })}
                >
                  Take the survey
                </Button>
              </ListItemButton>
            ) : (
              <></>
            )}
            {location.state &&
            location.state.username &&
            location.state.journalist == "true" ? (
              <ListItemButton divider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate("/survey", { state: location.state })}
                >
                  Referee scoring for journalists
                </Button>
              </ListItemButton>
            ) : (
              <></>
            )}

            {location.state && location.state.username ? (
              <ListItemButton divider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() =>
                    navigate("/fancomplaint", { state: location.state })
                  }
                >
                  Send Complaint
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
  );
}
