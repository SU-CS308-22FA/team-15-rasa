import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  AppBar,
  Checkbox,
  FormControlLabel,
  Rating,
  Toolbar,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import UserMenu from "../../UserMenu/UserMenu";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsSoccerTwoToneIcon from "@mui/icons-material/SportsSoccerTwoTone";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export default function JournalistSurvey() {
  const location = useLocation();
  const navigate = useNavigate();
  const [referee, setReferee] = useState("");
  const [referees, setReferees] = useState([]);
  const [checked, setChecked] = React.useState([false, false]);
  const [answers, setAnswers] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    axios
      .get("api/v1", {
        params: {
          _collection: "ref_stats",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setReferees(res.data.items);

          console.log(referees);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const questions = [
    "From 1 to 10, how would you rate the offside calls of this referee?",
    "From 1 to 10, how would you rate the foul calls of this referee?",
    "From 1 to 10, how would you rate the communication of the referee to the players?",
    "From 1 to 10, how would you rate the bookings of this referee?",
    "From 1 to 10, how would you rate the throw in decisions of this referee?",
    "From 1 to 10, how would you rate the corner kick decisions of this referee?",
    "From 1 to 10, how would you rate the goal kick decisions of this referee?",
    "From 1 to 10, how would you rate the referee's attempt at maintaining the tempo of the game?",
    "From 1 to 10, how would you rate the referee's communication with VAR?",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/v1/", {
        _collection: "journalistscore",
        answers: answers,
        ...referee,
      })
      .then((res) => {
        if (res && res.status === 200) {
          navigate("/", { state: location.state });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Referee scoring for journalists
          </Typography>
        </Toolbar>
      </AppBar>
      <label>Referee</label>
      <Select value={referee} onChange={(e) => setReferee(e.target.value)}>
        <MenuItem value="">Select a referee</MenuItem>
        {referees.map((ref) => (
          <MenuItem key={ref._id} value={ref}>
            {ref.name}
          </MenuItem>
        ))}
      </Select>
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
        {referees ? (
          <div>
            <div>
              {questions.map((question, index) => (
                <Box
                  sx={{
                    "& > legend": { mt: 3 },
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="legend">{question}</Typography>
                  <Rating
                    name="ref-voting"
                    defaultValue={0}
                    getLabelText={(value) =>
                      `${value} Ball${value !== 1 ? "s" : ""}`
                    }
                    precision={1}
                    icon={<NewspaperIcon fontSize="inherit" />}
                    emptyIcon={<NewspaperIcon fontSize="inherit" />}
                    max={10}
                    size={"large"}
                    onChange={(event, newValue) => {
                      setAnswers(
                        answers.map((answer, i) =>
                          i === index ? newValue : answer
                        )
                      );
                    }}
                  />
                </Box>
              ))}
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
          </div>
        ) : (
          <Typography component="h1" variant="h5">
            Loading...
          </Typography>
        )}
      </Box>
    </div>
  );
}
