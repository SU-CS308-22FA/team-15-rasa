import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Container, Divider, List, ListItemButton, Toolbar,} from "@mui/material";

export default function SeeComplaints() {
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
              variant="h2"
              align="center"
              color="textPrimary"
              gutterbottom
            >
              Referee Complaints
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              2010-2011 şampiyonu trabzonspor
            </Typography>
            
          </Container>
        </div>
      </main>
    </>
  );
}
