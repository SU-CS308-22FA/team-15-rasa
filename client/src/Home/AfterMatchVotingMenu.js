import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {CircularProgress, ListItemButton} from "@mui/material";

export default function AfterMatchVotingMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [matches, setMatches] = useState([]);
    const [matchLoaded, setMatchLoaded] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        axios.get("/api/v1/",
            {
                params: {
                    _collection: "fixture",
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .then((res) => {
                if (res && res.status === 200) {
                    setMatches(res.data.items);
                    setMatchLoaded(true);
                }
            });
        return () => {
            setAnchorEl(null);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChoice = (id) => {
        setAnchorEl(null);
        navigate("/aftermatchvoting", { state: {...location.state, matchID: id} });
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
                After Match Voting
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
                                matches.map((match) =>
                                    {
                                        return (
                                            match.matchStatus === "MS" ?
                                            <MenuItem key={match._id} value={match._id} onClick={() => handleChoice(match._id)}>{match.homeTeam} vs {match.awayTeam}</MenuItem>
                                            :
                                            null
                                        );
                                    })
                                :
                                <MenuItem>No matches were found</MenuItem>
                        }
                    </Menu>
            }
        </ListItemButton>
    );
}
