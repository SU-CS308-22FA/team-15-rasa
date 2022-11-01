import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { AppBar, Toolbar, Container, ListItem, Divider, ListItemText, List } from '@mui/material';
import {Link } from "react-router-dom";

export default function UserSettings() {
  return (
    <>
        <CssBaseline />
        <AppBar position= "relative">
            <Toolbar>
                <Typography component="h1" variant="h5">
                Account Settings
                </Typography>
            </Toolbar>
        </AppBar>
        <main>
            <div>
                <Container maxWidth="sm">
                    <Typography variant="h2" align="center" color="textPrimary" gutterbottom>
                        Edit Account
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        You can change account settings in this page.
                    </Typography>
                    <div>
                        <List sx={{ mt: 3, mb: 2 }} scomponent="nav" aria-label="mailbox folders">
                        <ListItem button>
                            <Link to="/ChangeEmail"><ListItemText primary="Change Email Adress"/></Link>
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <Link to="/ChangeUsername"><ListItemText primary="Change Username" /></Link>
                        </ListItem>
                        <ListItem button>
                            <Link to="/ChangePassword"><ListItemText primary="Change Password" /></Link>
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <Link to="/DeleteAccount"><ListItemText primary="Delete My Account" /></Link>
                        </ListItem>
                        </List>
                    </div>                    
                </Container>
            </div>
        </main>
    </>          
  );
}

