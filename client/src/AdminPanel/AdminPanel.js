import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Container, Divider, List, ListItemButton, Toolbar,} from "@mui/material";

export default function AdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();
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
