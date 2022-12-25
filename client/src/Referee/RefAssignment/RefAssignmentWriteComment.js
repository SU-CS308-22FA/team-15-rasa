// Page for writing comments on referee assignments
import * as React from "react";
import {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserMenu from "../../UserMenu/UserMenu";
import Grid from "@mui/material/Grid";
import CommentIcon from '@mui/icons-material/Comment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RefereeAssignmentWriteComment() {
    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
        setOpenSuccess(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put("/api/v1/", {
            _collection: "ref_assignments",
            _id: location.state.match_id,
            comments: [
                {
                    username: location.state.username,
                    date: new Date(),
                    comment: comment,
                    email: location.state.email
                },
                ...location.state.comments
            ]
        })
        .catch((err) => {
            console.log(err);
            setOpenError(true);
        })
        .then((res) => {
            if (res && res.status === 200) {
                setComment("");
                setOpenSuccess(true);
            } else {
                setOpenError(true);
            }
        });
    };

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Write a Comment
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container sx={
                {
                    my: 2,
                    mx: 1,
                }
            }>
                <Grid xs={3} item>
                    {
                        <Button variant="contained" onClick={
                            () => navigate(
                                "/refassignmentcomments",
                                { state: location.state }
                            )
                        }>
                            <CommentIcon/> Go Back to Comments
                        </Button>
                    }
                </Grid>
                    <Grid xs={true} item style={{ flexGrow: "1" }}>
                </Grid>
                <Grid xs={1} item>
                    <UserMenu/>
                </Grid>
            </Grid>
            <Paper
                sx={{
                    my: 2,
                    mx: 1,
                }}
            >
                <SimpleMDE
                    value={comment}
                    onChange={(value) => setComment(value)}
                />
            </Paper>
            <Box
                sx={{
                    mx: 3,
                    my: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Comment successfully submitted!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    There was an error submitting your comment.
                </Alert>
            </Snackbar>
        </div>
    );
}