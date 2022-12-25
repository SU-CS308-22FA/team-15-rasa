import * as React from "react";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material/styles";
import "../CSS/Site.css";
import {StandingTable} from "../Components/StandingTable";

const theme = createTheme();

function StandingData() {
  return (
    <div>
      <Typography component="h1" variant="h5" className="ref-container">
        2022/2023 Standings
        <br></br>
      </Typography>
      <div className="RefData">
        <table>
          <StandingTable />
        </table>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
export default StandingData;
