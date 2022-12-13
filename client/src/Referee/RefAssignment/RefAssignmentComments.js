// A page where users can comment on a particular referee assignment
import React, { useState } from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {AppBar, Avatar, Toolbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import Moment from "moment";
import Typography from "@mui/material/Typography";
import UserMenu from "../../UserMenu/UserMenu";
import Button from "@mui/material/Button";
import AddCommentIcon from '@mui/icons-material/AddComment';
import ReactMarkdown from "react-markdown";


export default function RefereeAssignmentComments() {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    axios.get("/api/v1/", {
            params: {
                _collection: "ref_assignments",
                _id: location.state.match_id
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            if (res && res.status === 200 && res.data.items.length > 0) {
                setComments(res.data.items[0].comments.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                }));
            }
        });

    const imgLink = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Comments
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
                        location.state.username ?
                            <Button variant="contained" onClick={
                                () => navigate(
                                    "/refassignmentwritecomment",
                                    { state: { ...location.state,  comments: comments } }
                                )
                            }>
                                <AddCommentIcon/> Write Comment
                            </Button>
                            :
                            <Typography component="h1" variant="h5">
                                Please log in to write a comment
                            </Typography>
                    }
                </Grid>
                    <Grid xs={true} item style={{ flexGrow: "1" }}>
                </Grid>
                <Grid xs={1} item>
                    <UserMenu/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {comments.map((comment) => (
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: 14 }}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar alt={comment.username} src={imgLink} />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textTransform: 'capitalize' }}>{comment.username}</h4>
                                    <p style={{ textAlign: "left" }}>
                                        <ReactMarkdown
                                            children={comment.comment}
                                        />
                                    </p>
                                    <p style={{ textAlign: "left", color: "gray" }}>
                                        posted at {Moment(comment.date).format("MMMM Do YYYY, h:mm:ss a")}
                                    </p>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}