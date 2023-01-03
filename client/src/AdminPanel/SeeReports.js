import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {AppBar, Avatar, Toolbar} from "@mui/material";
import Grid from "@mui/material/Grid";
import Moment from "moment";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReactMarkdown from "react-markdown";
import ClearIcon from '@mui/icons-material/Clear';


export default function SeeReports() {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    let [comments, setComments] = useState([]);
    let [allComments, setAllComments] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const imgLink = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

    useEffect(() => {
        axios.get("/api/v1/", {
            params: {
                _collection: "ref_assignments",
            }
        })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                if (res && res.status === 200 && res.data.items.length > 0) {
                    const assignments = res.data.items;
                    console.log(assignments);
                    for(let i=0;i<assignments.length;i++){
                        if (!assignments[i].comments) {
                            continue;
                        }
                        for(let j=0;j<assignments[i].comments.length;j++){
                            allComments = allComments.concat(assignments[i].comments[j]);
                            if(assignments[i].comments[j].reports.length>0){
                                comments = comments.concat(assignments[i].comments[j]);
                            }
                        }
                    }
                    console.log(comments);
                    setComments(comments);
                    setAllComments(allComments);
                }
            });
    }, []);

    const handleDelete = (comment) => {
        const index = comments.indexOf(comment);
        if (index > -1) {
            comments.splice(index, 1); //remove comment
        }
        const index2 = allComments.indexOf(comment);
        if (index2 > -1) {
            allComments.splice(index2, 1); //remove comment again
        }
        const temp = [];
        for(let i=0;i<allComments.length;i++){
            if(allComments[i].match_id === comment.match_id){
                temp.push(allComments[i]);
            }
        }
        axios.put("/api/v1/", {
            _collection: "ref_assignments",
            _id: comment.match_id,
            comments: temp
        })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                console.log(comments);
                setComments(comments);
                setAllComments(allComments);
                forceUpdate();
            });
    }

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Reported Comments
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
                {comments.sort((a, b) => {
                    return b.reports.length - a.reports.length;
                }).map((comment) => (
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
                                    <p>
                                        Reports: {comment.reports.length}
                                    </p>
                                    <Button variant="contained" startIcon={<ClearIcon />} onClick={() => handleDelete(comment)}>
                                        Delete Comment
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}