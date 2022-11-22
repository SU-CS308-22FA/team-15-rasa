import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  ListItem,
  Divider,
  ListItemText,
  List,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function TeamPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Rasa Team Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterbottom
            >
              Team Panel Moment
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              2010-2011 şampiyonu trabzonspor
            </Typography>
            <div>
              <p>Email: {location.state.email}</p>
            </div>
            <div>
              <List
                sx={{ mt: 3, mb: 2 }}
                scomponent="nav"
                aria-label="mailbox folders"
              >
                <ListItem button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() =>
                      navigate("/changeemail", { state: location.state })
                    }
                  >
                    Change Email
                  </Button>
                </ListItem>
                <Divider />
                <ListItem button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() =>
                      navigate("/changepassword", { state: location.state })
                    }
                  >
                    Change Password
                  </Button>
                </ListItem>
                
                <Divider light />
                <ListItem button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate("/")}
                  >
                    Log out
                  </Button>
                </ListItem>
              </List>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
