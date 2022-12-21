// This page will showcase a match and its details in real time.
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Box, AppBar, Toolbar, Select, FormControl} from "@mui/material";
import Typography from "@mui/material/Typography";
import UserMenu from "../UserMenu/UserMenu";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MatchView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [matches, setMatches] = useState([]);
    const [matchID, setMatchID] = useState('');
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
        setOpenSuccess(false);
    };

    const handleMatchSelect = (event) => {
        setMatchID(event.target.value);
        if (event.target.value !== '') {
            console.log(event.target.value);
            setSelectedMatch(matches.find(match => match._id === event.target.value));
        } else {
            console.log('empty');
            setSelectedMatch(null);
            console.log(selectedMatch);
        }

    };

    useEffect(() => {
        axios.get(
            "/api/v1/",
            {
                params: {
                    _collection: "ref_assignments",
                }
            })
            .catch(
                (err) => {
                    console.error(err);
                })
            .then((res) => {
                    if (res && res.status === 200) {
                        setMatches(res.data.items);
                    }
                });
    }, []);

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://widgets.sir.sportradar.com/sportradar/widgetloader";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [matchID]);

    return (
        <div>
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There was an error.
                </Alert>
            </Snackbar>
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
                <UserMenu/>
            </Box>
            <Box
                sx={{
                    my: 2,
                    mx: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="match-select-label">Match</InputLabel>
                    <Select
                        labelId="match-select-label"
                        id="match-select"
                        value={matchID}
                        onChange={handleMatchSelect}
                        autoWidth
                        label="Match"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {matches.map((match) => (
                            <MenuItem value={match._id}>{match.home} vs {match.away}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography component="h1" variant="h5">
                    {selectedMatch ?  selectedMatch.home + ' vs ' + selectedMatch.away : "Please select a match from above selection"}
                </Typography>
                <Typography component="h1" variant="h5">
                     {selectedMatch ? "Referee: " + selectedMatch.referee : null}
                </Typography>
            </Box>
            <div id="sr-widget" data-sr-widget="match.lmtPlus" data-sr-match-id="37391031"></div>
        </div>
    );
}