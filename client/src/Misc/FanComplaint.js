import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material/styles";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

const theme = createTheme();

export default function FanComplaint() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("explanation")) {
      alert("Please enter a valid complaint.");
      return;
    }
    axios
      .post("/api/v1", {
        _collection: "fanComplaints",
        email: location.state.email,
        explanation: data.get("explanation"),
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res && res.status === 200) {
          navigate("/", { state: location.state });
          alert("Complaint sent.");
        } else {
          alert("An error occurred, please try again.");
        }
      });
  };

  return (
    <>
      <CssBaseline />
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
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Send a complaint
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            //required
            fullWidth
            id="explanation"
            name="explanation"
            label="Explanation"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}
