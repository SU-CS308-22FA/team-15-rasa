import React, {useState} from "react";
import TFFNews from './TFFNews';
import JournalistNews from './JournalistNews';
import '../CSS/Site.css';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import UserMenu from "../UserMenu/UserMenu";

function News(){
    const [active, setActive] = useState(true);
    return(
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Sports and Referees News
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
            <Box
                sx={{
                    my: 3,
                    mx: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
                >
                <UserMenu/>                
            </Box>            
            </div>
            <div className="tabs">
                <div className="tab-fix" onClick={()=> setActive(true)}>
                    <h2 style={{color: active? "#c20114": null}}>
                        <Button variant="contained" disableElevation width="50px" height="50px">
                            TFF News
                        </Button>
                    </h2>
                </div>
                <div className="tab-standings" onClick={()=> setActive(false)}>
                <h2 style={{color: !active? "#c20114": null}}>
                    <Button variant="contained" disableElevation width="50px" height="50px">
                        Journalist Articles
                    </Button>
                </h2>
                </div>
            </div>
        {active ? <TFFNews/> : <JournalistNews/>}
        </div>
    );
}
export default News;