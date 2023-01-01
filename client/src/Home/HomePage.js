import * as React from "react";
import {useEffect} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {List, ListItemButton} from "@mui/material";
import UserMenu from "../UserMenu/UserMenu";
import MatchViewMenu from "./MatchViewMenu";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import AfterMatchVotingMenu from "./AfterMatchVotingMenu";


export default function HomePage({ stateChanger }) {
    const navigate = useNavigate();
    let [location, setLocation] = React.useState(useLocation());
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        if(!window.location.hash && location.state) {
            window.location = window.location + '#loaded';
            const locationState = location.state;
            window.localStorage.setItem("locationState", JSON.stringify(locationState));
            window.location.reload();
        }
        const themeUnparsed = window.localStorage.getItem("theme");
        stateChanger(themeUnparsed ? JSON.parse(themeUnparsed) : true);
        location.state = JSON.parse(window.localStorage.getItem("locationState"));
        setLocation(location);
        forceUpdate();
    }, [location, stateChanger, forceUpdate]);

    const refreshReferees = async () => {
        let refIds = [];
        await axios.get('/api/v1',
            {
                params: {
                    _collection: "ref_stats",
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200 && res.data.items) {
                    refIds = res.data.items.map((ref) => ref._id);
                }
            });
        console.log("refIds: ", refIds);
        for (let i = 0; i < refIds.length; i++) {
            await axios.delete('/api/v1',
                {
                    data: {
                        _collection: "ref_stats",
                        _id: refIds[i]
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("Deleted: ", refIds[i]);
                    } else {
                        console.log("Error deleting: ", refIds[i]);
                    }
                });
        }

        let refStats = [];
        await axios.get("/api/transferMarkt",
            {
                params: {
                    type: "referees"
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200) {
                    refStats = res.data;
                }
            });
        console.log("refStats: ", refStats);

        for (let i = 0; i < refStats.length; i++) {
            const ref = refStats[i];
            await axios.post("api/v1/",
                {
                    _collection: "ref_stats",
                    ...ref
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("posted: ", ref);
                    } else {
                        console.log("error posting: ", ref);
                    }
                });
        }
    }

    const refreshStanding = async () => {
        let standingIds = [];
        await axios.get('/api/v1',
            {
                params: {
                    _collection: "standing",
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200 && res.data.items) {
                    standingIds = res.data.items.map((item) => item._id);
                }
            });
        console.log("standingIds: ", standingIds);
        for (let i = 0; i < standingIds.length; i++) {
            await axios.delete('/api/v1',
                {
                    data: {
                        _collection: "standing",
                        _id: standingIds[i]
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("deleted: ", standingIds[i]);
                    } else {
                        console.log("error deleting: ", standingIds[i]);
                    }
                });
        }

        let standingData = [];
        await axios.get("/api/mackolik",
            {
                params: {
                    type: "standing"
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200) {
                    standingData = res.data;
                }
            });
        console.log("standingData: ", standingData);

        for (let i = 0; i < standingData.length; i++) {
            const team = standingData[i];
            await axios.post("api/v1/",
                {
                    _collection: "standing",
                    ...team
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("posted: ", team);
                    } else if (res) {
                        console.log("error: ", res);
                    } else {
                        console.log("error posting: ", team);
                    }
                });
        }
    }

    const refreshFixture = async () => {
        let fixtureIds = [];
        await axios.get('/api/v1',
            {
                params: {
                    _collection: "fixture",
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200 && res.data.items) {
                    fixtureIds = res.data.items.map((item) => item._id);
                }
            });
        console.log("fixtureIds: ", fixtureIds);
        for (let i = 0; i < fixtureIds.length; i++) {
            await axios.delete('/api/v1',
                {
                    data: {
                        _collection: "fixture",
                        _id: fixtureIds[i]
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("deleted: ", fixtureIds[i]);
                    } else {
                        console.log("error deleting: ", fixtureIds[i]);
                    }
                });
        }

        for (const years of ["2020-2021", "2021-2022", "2022-2023"]) {
            let fixtureData = [];
            await axios.get("/api/mackolik",
                {
                    params: {
                        type: "fixture",
                        years: years
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        fixtureData = res.data;
                    }
                });
            console.log("fixtureData: ", fixtureData);

            for (let i = 0; i < fixtureData.length; i++) {
                const fixture = fixtureData[i];
                await axios.post("api/v1/",
                    {
                        _collection: "fixture",
                        ...fixture
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .then((res) => {
                        if (res && res.status === 200) {
                            console.log("posted: ", fixture);
                        } else if (res) {
                            console.log("error: ", res);
                        } else {
                            console.log("error posting: ", fixture);
                        }
                    });
            }
        }
    };

    const refreshLiveMatch = async () => {
        let liveMatchIds = [];
        await axios.get('/api/v1',
            {
                params: {
                    _collection: "live_matches",
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200 && res.data.items) {
                    liveMatchIds = res.data.items.map((item) => item._id);
                }
            });
        console.log("liveMatchIds: ", liveMatchIds);
        for (let i = 0; i < liveMatchIds.length; i++) {
            await axios.delete('/api/v1',
                {
                    data: {
                        _collection: "live_matches",
                        _id: liveMatchIds[i]
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("deleted: ", liveMatchIds[i]);
                    } else {
                        console.log("error deleting: ", liveMatchIds[i]);
                    }
                });
        }

        let liveMatchData = [];
        axios.get("/api/sportRadar/",
            {
                params: {
                    country: "Turkiye",
                    league: "Super Lig"
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200) {
                    liveMatchData = res.data;
                }
            });
        console.log("liveMatchData: ", liveMatchData);

        for (let i = 0; i < liveMatchData.length; i++) {
            const liveMatch = liveMatchData[i];
            await axios.post("api/v1/",
                {
                    _collection: "live_match",
                    ...liveMatch
                })
                .catch((err) => {
                    console.error(err);
                })
                .then((res) => {
                    if (res && res.status === 200) {
                        console.log("posted: ", liveMatch);
                    } else if (res) {
                        console.log("error: ", res);
                    } else {
                        console.log("error posting: ", liveMatch);
                    }
                });
        }
    }

    const handleRefresh = async () => {
        await refreshReferees();
        await refreshStanding();
        await refreshFixture();
        await refreshLiveMatch();
    }

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
            <UserMenu/>
            <Button
                variant="contained"
                onClick={handleRefresh}
            >
                <RefreshIcon/>
            </Button>
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
              <MatchViewMenu/>
              {
                    location.state && location.state.username ?
                        <AfterMatchVotingMenu/>
                        :
                        null
              }
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
                Survey Results
              </Button>
            </ListItemButton>
              {location.state && location.state.username ? (
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
