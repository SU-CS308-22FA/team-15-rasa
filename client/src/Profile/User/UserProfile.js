import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Container, Toolbar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import axios from "axios";
export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState({ label: "" });
  const handleChange = (e, v) => setSelected(v);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("realName") || !data.get("age") || selected.label == "") {
      alert("Please make sure all forms are filled.");
      return;
    }
    console.log(data.get("realName"));
    console.log(data.get("age"));
    console.log(selected.label);

    axios
      .put("/api/v1", {
        _collection: "surveys",
        _id: location.state._id,
        name: data.get("realName"),
        team: selected.label,
        age: data.get("age"),
      })
      .catch((err) => {
        console.log(err);
        alert("Error could not save the changes!");
      })
      .then((res) => {
        if (res && res.status === 200) {
          alert("Info updated successfully!");
        }
      });
  };

  const Teams = [
    { label: "Adana Demirspor" },
    { label: "Alanyaspor" },
    { label: "Ankaragucu" },
    { label: "Antalyaspor" },
    { label: "Besiktas" },
    { label: "Fenerbahce" },
    { label: "Fatih Karagumruk" },
    {
      label: "Galatasaray",
    },
    { label: "Gaziantep FK" },
    { label: "Giresunspor" },
    {
      label: "Hatayspor",
    },
    {
      label: "Istanbul Basaksehir",
    },
    { label: "Istanbulspor" },
    { label: "Kasimpasa" },
    {
      label: "Kayserispor",
    },
    {
      label: "Konyaspor",
    },
    { label: "Sivasspor" },
    { label: "Trabzonspor" },
    { label: "Umraniyespor" },
  ];

  return (
    <>
      <Grid container component="main" sx={{ height: "15vh" }}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography component="h1" variant="h5">
              Account Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div>
            <Container maxWidth="sm">
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
                  User Profile
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  You can update your profile and select your team on this page.
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
                    name="realName"
                    label="Real name"
                    id="filled-required"
                    variant="filled"
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name="team"
                    options={Teams}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Team" />
                    )}
                  />
                  <TextField
                    margin="normal"
                    name="age"
                    required
                    fullWidth
                    label="Age"
                    id="filled-required"
                    variant="filled"
                  />
                  <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden />
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save Changes
                  </Button>
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item>
                      <Button
                        onClick={() =>
                          navigate("/", {
                            state: location.state,
                          })
                        }
                      >
                        Return to Home Page
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        </main>
      </Grid>
    </>
  );
}
