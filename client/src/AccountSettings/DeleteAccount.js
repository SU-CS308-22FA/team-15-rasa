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

        if (!data.get("password")) {
            alert("Please enter your password.")
            return;
        }
        if (data.get("password") !== location.state.password) {
            alert("Incorrect password.");
            return;
        }

        axios
            .delete("/api/v1", {
                data: {
                    _collection: "users",
                    _id: location.state._id
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                if (res.status === 200) {
                    navigate("/");
                } else {
                    alert("An error occurred during deletion.")
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
                                    Delete Account
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
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        autoComplete="password"
                                        autoFocus
                                    />
                                    <Button
                                        type="danger"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Delete My Account
                                    </Button>
                                    <Grid container>
                                        <Grid item xs></Grid>
                                        <Grid item>
                                            <Button onClick={() => navigate("/accountsettings")}>
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
