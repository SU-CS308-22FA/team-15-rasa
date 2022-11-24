import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AppBar, Container, Toolbar} from "@mui/material";
import axios from "axios";

const theme = createTheme();

export default function ChangeEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get("new_email")) {
            alert("Please enter a new email");
            return;
        }
        if (data.get("new_email") === location.state.email) {
            alert("New email cannot be the same as the old email");
            return;
        }

        axios
            .get("/api/v1", {
                params: {
                    _collection: "users",
                    email: data.get("email"),
                },
            })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                if (res && res.data.items.length !== 0) {
                    alert("Email is already in use.");
                    return;
                }
                if (res) {
                    axios
                        .put("/api/v1", {
                            _collection: "users",
                            _id: location.state._id,
                            email: data.get("new_email"),
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .then((res) => {
                            if (res && res.status === 200) {
                                location.state.email = data.get("new_email");
                                alert("Email changed successfully");
                            } else {
                                alert("Error changing email.");
                            }
                        });
                }
            });
    };
    return (
        <ThemeProvider theme={theme}>
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
                                    Edit Email Address
                                </Typography>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                    You can change your email address in this page.
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
                                        id="new_email"
                                        label="New Email"
                                        name="new_email"
                                        autoComplete="email"
                                        autoFocus
                                    />
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
                                                    navigate("/accountsettings", {
                                                        state: location.state,
                                                    })
                                                }
                                            >
                                                Return to account settings
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </div>
                </main>
            </Grid>
        </ThemeProvider>
    );
}
