import * as React from "react";
import Typography from "@mui/material/Typography";
import "../CSS/Site.css";
import {FixturesTable} from "../Components/FixturesTable";

function FixtureData() {
  return (
    <div>
      <Typography component="h1" variant="h5" className="ref-container">
        Fixture
      </Typography>
      <div className="RefData">
        <table>
          <FixturesTable/>
        </table>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
export default FixtureData;
