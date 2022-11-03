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

export default function UserSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
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
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterbottom
            >
              Edit Account
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              You can change account settings in this page.
            </Typography>
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
                <ListItem button divider>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() =>
                      navigate("/changeusername", { state: location.state })
                    }
                  >
                    Change Username
                  </Button>
                </ListItem>
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
                    onClick={() =>
                      navigate("/deleteaccount", { state: location.state })
                    }
                  >
                    Delete account
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
