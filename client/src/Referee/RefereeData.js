import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar} from "@mui/material";
import '../CSS/Site.css';
import {RefereeTable} from '../Components/RefereeTable';

const theme = createTheme();

function RefereeData() {
  return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "15vh" }}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <Typography component="h1" variant="h5" align="center">
                Referee Statistics
              </Typography>
            </Toolbar>
          </AppBar>
            <div className="Teams">
              <Typography component="h1" variant="h5" className="ref-container">
                <br></br>
                Season 2022/2023 Referees Data
                <br></br>
              </Typography>
              <div className="RefData">
                <br></br>
                <table>
                  <RefereeTable/> 
                </table>  
                <br></br>  
                <br></br>  
                <br></br>                          
              </div>
            </div>
        </Grid>
      </ThemeProvider>
  );
}
export default RefereeData;
