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

export default function ChangePassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!data.get("password") || !data.get("new_password") || !data.get("confirm_password")) {
            alert("Please make sure all forms are filled.");
            return;
        }
        if (data.get("new_password") !== data.get("confirm_password")) {
            alert("The new password and confirm password fields should match.");
            return;
        }
        if (data.get("new_password") === location.state.password) {
            alert("The new and old passwords cannot be the same.");
            return;
        }
        if (location.state.password !== data.get("password")) {
            alert("Please check your password.");
            return;
        }

        axios
            .put("/api/v1", {
                _collection: "users",
                _id: location.state._id,
                password: data.get("new_password"),
            })
            .catch((err) => {
                console.log(err);
                alert("There was an error changing the password, please try again.");
            })
            .then((res) => {
                if (res && res.status === 200) {
                    location.state.password = data.get("new_password");
                    alert("Password changed successfully!");
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
                                    Change Password
                                </Typography>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                    You can change your password in this page.
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
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="new_password"
                                        label="New Password"
                                        type="password"
                                        name="new_password"
                                        autoComplete="new_password"
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        name="confirm_password"
                                        autoComplete="confirm_password"
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
                                                    navigate("/accountsettings", {state: location.state})
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
