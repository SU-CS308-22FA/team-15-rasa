// This page will showcase a match and its details in real time.
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Box, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import Button from "@mui/material/Button";

export default function MatchView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [matchID, setMatchID] = useState('');


    useEffect(() => {
        setMatchID(location.state.matchID);
        const script = document.createElement('script');
        script.src = "https://widgets.sir.sportradar.com/sportradar/widgetloader";
        script.async = true;
        script.type = "application/javascript";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Match View
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    my: 3,
                    mx: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => navigate("/", {state: location.state})}

                >
                    <HomeIcon/>
                </Button>
            </Box>
            <div id="sr-widget" data-sr-widget="match.lmtPlus" data-sr-match-id={matchID}></div>
        </div>
    );
}