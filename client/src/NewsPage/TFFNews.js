import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import "../RefereeListDetails/RefereeList.css";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
export default function TFFNews(){
    const [news, setNews] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        axios.get("/api/v1/", {
            params: {
                _collection: "tff_news",
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            if (res && res.status === 200 && res.data.items.length > 0) {
                setNews(res.data.items);
            }
        });
    }, []);
    
    return(
        <div>
            <Box
                sx={{
                    my: 2,
                    mx: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >                             
                    <div className="content_container">
                    {news.map((row)=>{
                        return (
                            <Card sx={{ maxWidth: 475 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[600] }} aria-label="recipe">
                                        TFF
                                    </Avatar>
                                }                                                                 
                                    title={row.title}
                                    subheader={row.date} 
                                    />
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={row.image_url}
                                    alt="News"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        <p>{row.intro}</p>
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>                                    
                                    <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>                                        
                                        <Typography paragraph>
                                            <p>{row.news_full}</p>
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                                </Card> 
                            ); 
                        })}                       
                    </div>    
                </Box>
            </div>
    );
}