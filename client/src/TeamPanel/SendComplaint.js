import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const theme = createTheme();

export default function SendComplaint() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      if (!data.get("ref_name")) {
          alert("Please enter a valid referee name.");
          return;
      }

      axios
          .get("/api/v1", {
              params: {
                  _collection: "complaints",
                  ref_name: data.get("ref_name"),
                  email: location.state.email
              },
          })
          .catch((err) => {
              console.log(err);
          })
          .then((res) => {
              if (res && res.data.items.length !== 0) {
                  alert("You already have an active complaint about this referee.");
                  return;
              }
              if (res) {
                  axios
                      .post("/api/v1", {
                          _collection: "complaints",
                          email: location.state.email,
                          ref_name: data.get("ref_name"),
                          explanation: data.get("explanation")
                      })
                      .catch((err) => {
                          console.log(err);
                      })
                      .then((res) => {
                          if (res && res.status === 200) {
                              navigate("/teampanel", { state: location.state });
                              alert("Complaint sent.");
                          } else {
                              alert("An error occurred, please try again.");
                          }
                      });
              }
          });
    };

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
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
              Send complaint about a referee
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="ref_name"
                name="ref_name"
                label="Referee Name"
                autoFocus
              />
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
    </ThemeProvider>
  );
}
