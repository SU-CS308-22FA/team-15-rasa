import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {CircularProgress, ListItemButton} from "@mui/material";

export default function MatchViewMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [matches, setMatches] = useState([]);
    const [matchLoaded, setMatchLoaded] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        axios.get("/api/sportRadar/")
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200) {
                    setMatches(res.data);
                    setMatchLoaded(true);
                }
            });

        return () => {
            setMatchLoaded(false);
            setMatches([]);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChoice = (event) => {
        setAnchorEl(event.currentTarget);
        navigate("/matchview", { state: {...location.state, matchID: event.currentTarget.value} });
    };

    return (
        <ListItemButton divider>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClick}
            >
                Live Match
            </Button>
            {
                !matchLoaded ?
                    <Menu
                        id="match-choice-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem>
                            <CircularProgress /> Loading Matches...
                        </MenuItem>
                    </Menu>
                    :
                    <Menu
                        id="match-choice-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        {
                            matches.length > 0 ?
                                matches.map((match) => (
                                    <MenuItem value={match.matchID}
                                              onClick={handleChoice}>{match.homeTeam} vs {match.awayTeam}</MenuItem>
                                ))
                                :
                                <MenuItem>No matches were found</MenuItem>
                        }
                    </Menu>
            }
        </ListItemButton>
    );
}
