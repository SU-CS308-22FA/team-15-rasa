import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {Link, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "axios";
import emailjs from "emailjs-com";

const theme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("email")) {
        alert("Invalid email");
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
        if (
            res &&
            (res.data.items.length === 0)
        ) {
            alert("Invalid email");
            return;
        }
        if (res) {
            var mailparams = {
                to_name: res.data.items[0].username,
                new_password: Math.floor((Math.random() * 9999) + 1000).toString(),
                email: data.get("email")
            }
            console.log(mailparams.new_password);

            axios
                .put("/api/v1", {
                    _collection: "users",
                    _id:  res.data.items[0]._id,
                    password: mailparams.new_password,
                });

            emailjs.send('service_9jnl1hv', 'template_6tlwdfg', mailparams, '-MSMiMIn7nh6SMA04')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                    alert(error);
                });
            alert("Check your e-mail.");
            navigate("/");
        } else {
            alert("There was an error. Please try again.");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.evrensel.net/upload/dosya/167821.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Enter your e-mail
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}