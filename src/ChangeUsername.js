import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
import {Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar, Container} from '@mui/material';

const theme = createTheme();

export default function ChangeUsername() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        username: data.get("username"),
        new_username: data.get("new_username"),
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
                            Edit Username
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            You can change your username in this page.
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
                                id="username"
                                label="Current Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="new_username"
                                label="New Username"
                                name="new_username"
                                autoComplete="new_username"
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
