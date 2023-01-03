import * as React from "react";
import Content from "../Components/Content";
import Grid from "@mui/material/Grid";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";

function StandFix() {
  return (
    <div className="Teams">
      <Grid container component="main" sx={{ height: "6vh" }}>
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
