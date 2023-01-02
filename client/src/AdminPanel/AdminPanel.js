import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Container, Divider, List, ListItemButton, Toolbar,} from "@mui/material";
import axios from "axios";
import RefreshIcon from '@mui/icons-material/Refresh';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function AdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const refreshAll = async () => {
    await refreshReferees();
    await refreshStanding();
    await refreshFixture();
    await refreshLiveMatch();
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Rasa Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Menu
            </Typography>
              <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={3}>
                      <Grid item xs={3}>
                            <Button variant="contained" onClick={refreshReferees}>
                                <RefreshIcon />
                                Referees
                            </Button>
                      </Grid>
                      <Grid item xs={3}>
                            <Button variant="contained" onClick={refreshStanding}>
                                <RefreshIcon />
                                Standing
                            </Button>
                      </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={refreshFixture}>
                                <RefreshIcon />
                                Fixture
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={refreshLiveMatch}>
                                <RefreshIcon />
                                Live Match
                            </Button>
                        </Grid>
                      <Grid item xs>
                          <Button variant="contained" fullWidth onClick={refreshAll}>
                              <RefreshIcon />
                              All
                          </Button>
                      </Grid>
                  </Grid>
              </Box>
            <div>
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
                      onClick={() =>
                          navigate("/refassignmentadmin", { state: location.state })
                      }
                  >
                    Referee Assignment
                  </Button>
                </ListItemButton>
                <ListItemButton>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() =>
                      navigate("/seecomplaints", { state: location.state })
                    }
                  >
                    See Referee Complaints
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
                      navigate("/seefancomplaints", { state: location.state })
                    }
                  >
                    See Fan Complaints
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
                      navigate("/createteamaccount", { state: location.state })
                    }
                  >
                    Create Team Account
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
                      navigate("/adminchangepassword", { state: location.state })
                    }
                  >
                    Change Password
                  </Button>
                </ListItemButton>
                
                <Divider light />
                <ListItemButton>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate("/")}
                  >
                    Log out
                  </Button>
                </ListItemButton>
              </List>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
