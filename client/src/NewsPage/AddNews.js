import React, { useState, useEffect } from "react";
import UserMenu from "../UserMenu/UserMenu";
import {useLocation, useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
export default function AddNews(){
    const location = useLocation();
    const navigate = useNavigate();
    const [jnews, setJNews] = useState([]);
    const [newsBody, setNewsBody] = useState("");
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    useEffect(() => {
        axios.get("/api/v1/", {
            params: {
                _collection: "j_news",
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            if (res && res.status === 200 && res.data.items.length > 0) {
              setJNews(res.data.items[0]);
            }
        });
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
        setOpenSuccess(false);
    };

    const handleSubmit = () => {     
        const title = document.getElementById("title").value;
        const image_url = document.getElementById("image_url").value;
        const intro = document.getElementById("intro").value;

        axios.put("/api/v1/", {
            _collection: "j_news",
            _id: jnews._id,
            news: [
                {                
                    author: location.state.username,
                    date: new Date(),
			        title: title,
			        image_url: image_url,
			        intro: intro,                    
                    news_body: newsBody,
                    email: location.state.email
                }                
            ].concat(jnews.news)
        })
        .catch((err) => {
            console.log(err);
            setOpenError(true);
        })
        .then((res) => {
            if (res && res.status === 200) {
                setJNews("");
                setOpenSuccess(true);
            } else {
                setOpenError(true);
            }
        });
  };   
    return(
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Sports and Referees News
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
                <Box
                    sx={{
                        my: 3,
                        mx: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                    }}
                >
                    <UserMenu/>
                </Box>                
                <Box
                    sx={{
                        my: 2,
                        mx: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    >
                    <Button
                        variant="contained"
                        color="primary"                                
                        onClick={() => navigate("/news")}
                    >
                        Check News
                    </Button>
                    <Typography component="h1" variant="h5" className="ref-container">                    
                        <h2>Add (Journalist) News</h2>                     
                    </Typography>
                    <div>
                        <div>
                        <Box                                                      
                            sx={{ mt: 1 }}
                        >
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image_url"
                            label="Add image URL"
                            name="image_url"
                            autoComplete="image_url"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Add Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            />
                            <TextField
                            variant="outlined"
                            multiline
                            rows={5}
                            maxRows={10}
                            margin="normal"
                            required
                            fullWidth
                            name="intro"
                            label="Add Introduction"
                            type="intro"
                            id="intro"
                            />
                            <SimpleMDE
                                value={newsBody}
                                onChange={(value) => setNewsBody(value)}
                            />
                            <Button variant="contained" onClick={handleSubmit}>
                                Add New
                            </Button>
                            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    New is successfully submitted!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    There was an error submitting your new.
                                </Alert>
                            </Snackbar>                     
                        </Box>                   
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
}