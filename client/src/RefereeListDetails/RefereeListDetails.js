import React, {useEffect, useState} from "react";
import "./RefereeList.css";
import {Referees} from "./RefereeListData.js";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AppBar, Toolbar, Card} from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from '@mui/material/CardActions';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserMenu from "../UserMenu/UserMenu";
import Box from "@mui/material/Box";

const theme = createTheme();
function RefereeListDetails() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
  return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "15vh" }}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <Typography component="h1" variant="h5" align="center">
                2022-2023 TFF Referees
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
              <Typography component="h1" variant="h5" className="ref-container">
                <br></br>
                Season 2022/2023 Super Lig Referees
                <br></br>
              </Typography>
                <div className="app_container">
                    <div className="content_container">                    
                        {Referees.map((referee)=>{
                            return (
                                <Card sx={{ maxWidth: 345 }}>
                                    <img src={`./Refereeimages/${referee.image}`} alt=""/>
                                    <Typography>
                                        <b>{referee.first_name}</b>
                                    </Typography>   
                                    <CardActions>                                 
                                        <PopupState>
                                            {(popupState) => (
                                                <div>
                                                <Button Button variant="contained" onClick={handleClickOpen} {...bindTrigger(popupState)} >
                                                    DETAILS
                                                </Button>
                                                    <Dialog
                                                        open={open}
                                                        onClose={handleClose}                                                      
                                                        {...bindPopover(popupState)}
                                                        anchorOrigin={{
                                                        vertical: 'bottom',                                                        
                                                        }}
                                                        transformOrigin={{
                                                        vertical: 'top',                                                        
                                                        }} >
                                                        <DialogTitle>
                                                            <Typography sx={{ p: 2 }}><b>{referee.first_name} </b></Typography>
                                                        </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <div className="img_content">
                                                                    <img src={`./Refereeimages/${referee.image}`} alt=""/>
                                                                </div>
                                                                <div></div>                                                               
                                                                <p>TFF Referee</p>
                                                                <p>Age: {referee.age}</p>
                                                                <p>Birth Date: {referee.birthdate}</p>
                                                                <p>More Information: {referee.info}</p>
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button Button variant="contained" onClick={handleClose} autoFocus>Close</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            )}
                                        </PopupState>
                                    </CardActions>
                                </Card>
                            ); 
                        })}
                    </div>
                </div> 
            </div>
        </Grid>
      </ThemeProvider>
  );
}
export default RefereeListDetails;