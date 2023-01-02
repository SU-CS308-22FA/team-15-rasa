import * as React from "react";
import Content from "../Components/Content";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import "../CSS/Site.css";

function StandFix() {
  return (
    <div className="Teams">
      <Grid container component="main" sx={{ height: "6vh" }}>
        <CssBaseline />
        <AppBar position="center">
          <Toolbar>
            <Typography component="h1" variant="h5">
              Fixtures & Standings
            </Typography>
          </Toolbar>
        </AppBar>
        <Content />
      </Grid>
    </div>
  );
}
export default StandFix;
