import React, {useState} from "react";
//import Standings from "./Standings";
//import Table from "./StanTableAPI.js";
//import Fix from "./Fix";
import StandingData from '../FixtureStanding/StandingData';
import FixtureData from '../FixtureStanding/FixtureData';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
//import { Table } from "@mui/material";

const Content=() => {
    const [active, setActive] = useState(true);
    return(
        <div className="content-container">
            <div className="tabs">
                <div className="tab-fix" onClick={()=> setActive(true)}>
                    <h2 style={{color: active? "#c20114": null}}>
                        <Button variant="contained" disableElevation width="50px" height="50px">
                            Fixtures
                        </Button>
                    </h2>
                </div>
                <div className="tab-standings" onClick={()=> setActive(false)}>
                <h2 style={{color: !active? "#c20114": null}}>
                    <Button variant="contained" disableElevation width="50px" height="50px">
                        Standings
                    </Button>
                </h2>
                </div>
            </div>
        {active ? <FixtureData/> : <StandingData/>}
        </div>
    );
}
export default Content;