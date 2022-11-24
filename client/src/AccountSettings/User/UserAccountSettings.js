import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Container, Divider, List, ListItemButton, Toolbar,} from "@mui/material";
import UserMenu from "../../UserMenu/UserMenu";
import Box from "@mui/material/Box";

export default function UserAccountSettings() {
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
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterbottom="true"
            >
              Edit Account Settings
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              You can change your account settings in this page.
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
                      navigate("/changeemail", { state: location.state })
                    }
                  >
                    Change Email
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
                      navigate("/changeusername", { state: location.state })
                    }
                  >
                    Change Username
                  </Button>
                </ListItemButton>
                <ListItemButton>
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
                </ListItemButton>
                <Divider light />
                <ListItemButton>
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
                </ListItemButton>
                <Divider light />
                <ListItemButton>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate("/", { state: location.state })}
                  >
                    Home Page
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
