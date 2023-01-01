import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {AppBar, Checkbox, FormControlLabel, Rating, Toolbar, Button} from "@mui/material";
import UserMenu from "../../UserMenu/UserMenu";
import Box from "@mui/material/Box";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsSoccerTwoToneIcon from '@mui/icons-material/SportsSoccerTwoTone';

export default function AfterMatchVoting() {
    const location = useLocation();
    const navigate = useNavigate();
    const match_id = location.state.matchID;
    const [match, setMatch] = useState(null);
    const [checked, setChecked] = React.useState([false, false]);
    const [answers, setAnswers] = useState([0, 0, 0, 0]);
    const questions = [
        "From 1 to 10, how would you rate the fairness of the referee in terms of yellow cards in this match?",
        "From 1 to 10, how would you rate the fairness of the referee in terms of red cards in this match?",
        "From 1 to 10, how would you rate the fairness of the referee in terms of penalties in this match?",
        "From 1 to 10, how would you rate the overall performance of the referee in this match?",
        ];

    useEffect(() => {
        console.log(match_id);
        axios.get("/api/v1/", {
            params: {
                _collection: "fixture",
                _id: match_id
            }
        })
        .then((res) => {
            if (res && res.status === 200) {
                setMatch(res.data.items[0]);
            }
        })
    }, [match_id]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put("/api/v1/", {
            _collection: "fixture",
            _id: match_id,
            after_match_votes: [
                {
                    date: new Date(),
                    email: location.state.email,
                    answers: answers
                },
            ].concat(match.after_match_votes ? match.after_match_votes : [])
        })
        .then((res) => {
            if (res && res.status === 200) {
                navigate("/", {state: location.state});
            }
        })
    }

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        After Match Voting
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
                <UserMenu />
            </Box>
            <Box
                sx={{
                my: 3,
                mx: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                {
                    match ?
                        <div>
                            <Typography variant="h5">
                                {match.homeTeam} vs {match.awayTeam}
                            </Typography>
                            <Typography variant="h6">
                                Played at {moment.unix(match.matchTime).format("DD/MM/YYYY HH:mm")}
                            </Typography>
                            <FormControlLabel
                                label="I have read and confirmed below conditions"
                                control={
                                    <Checkbox
                                        checked={checked[0] && checked[1]}
                                        indeterminate={checked[0] !== checked[1]}
                                        onChange={handleChange1}
                                    />
                                }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                <FormControlLabel
                                    label="I confirm that I have watched this match trough the whole duration"
                                    control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                                />
                                <FormControlLabel
                                    label="I confirm that I will vote in good faith"
                                    control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                                />
                            </Box>
                            {
                                checked[0] && checked[1] ?
                                    <div>
                                        {
                                            questions.map((question, index) =>
                                                <Box
                                                    sx={{
                                                        '& > legend': {mt: 3},
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Typography component="legend">{question}</Typography>
                                                    <Rating
                                                        name="ref-voting"
                                                        defaultValue={0}
                                                        getLabelText={(value) => `${value} Ball${value !== 1 ? 's' : ''}`}
                                                        precision={1}
                                                        icon={<SportsSoccerTwoToneIcon fontSize="inherit"/>}
                                                        emptyIcon={<SportsSoccerIcon fontSize="inherit"/>}
                                                        max={10}
                                                        size={"large"}
                                                        onChange={(event, newValue) => {
                                                            setAnswers(answers.map((answer, i) => i === index ? newValue : answer));
                                                        }}
                                                    />
                                                </Box>
                                            )
                                        }
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                    :
                                    <div>
                                        <Typography variant="h6">
                                            Please confirm the above conditions to vote
                                        </Typography>
                                    </div>
                            }
                        </div>
                        :
                        <Typography component="h1" variant="h5">
                            Loading...
                        </Typography>
                }
            </Box>
        </div>
    );
}