import * as React from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import '../CSS/Site.css';
import {FixturesTable} from '../Components/FixturesTable';

const theme = createTheme();

function FixtureData() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography component="h1" variant="h5" className="ref-container">
            Monthly Fixture
          </Typography>
          <div className="RefData">
            <table>
              <FixturesTable/> 
            </table>  
            <br></br>  
            <br></br>                         
          </div>
      </div>
    </ThemeProvider>
  );
}
export default FixtureData;
