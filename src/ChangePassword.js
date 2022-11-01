import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Container} from '@mui/material';

const theme = createTheme();

export default function ChangePassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        password: data.get("password"),
        new_password:data.get("new_password"),
        confirm_password: data.get("confirm_password"),
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "15vh" }}>
        <CssBaseline />
            <AppBar position= "relative">
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
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
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
                                {/* <Link to="/signup" href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link> */}
                                <Link to="/UserSettings">Return Account Settings</Link>
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
