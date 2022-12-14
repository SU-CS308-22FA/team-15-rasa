import {Matches_1, Matches_2, Matches_3} from "./RefereeRankingData.js";
import {Fixtures} from "../Components/FMOCK_DATA.json"
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AppBar, TableSortLabel, Toolbar} from "@mui/material";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import '../RefereeListDetails/RefereeList.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
//import UserMenu from "../../UserMenu/UserMenu";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { If, Then, Else, When, Unless, Switch, Case, Default } from 'react-if';

const theme = createTheme();

const RefereeRankings = () =>{
  const [data, setData]= useState();
  const [selectedMatch, setSelectedMatch] = useState('')
  /*const location = useLocation();
  const navigate = useNavigate();
  const[rankings, setRankings] = useState([]);

  axios.get(
    "/api/v1/",
    {
        params: {
            _collection: "ref_rankings",
            }
        }
    )
    .catch((err) => {
        console.log(err);
    })
    .then((res) => {
        setRankings(res.data.items);
    });*/
    const [selects, setSelects]=useState();

    return(
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "15vh" }}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <Typography component="h1" variant="h5" align="center">
                Referee Rankings                
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>
          <div className="rankings-container">
            <div className="select-container">
            <h1>{selects}</h1>
              <select value={selects} onChange={e=>setSelects(e.target.value)}
              >
                <option></option>                
                <option value={Matches_1.value}>Fenerbahçe - Hatayspor</option>
                <option value={Matches_2.value}>Sivasspor - Galatasaray</option>
                <option value={Matches_3.value}>Beşiktaş - Adana Demirspor</option>
              </select>       
              <Typography component="h1" variant="h5" className="ref-container" text-align="center">
                    <br></br>
                    Referee Rankings
                    <br></br>
                </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}><b>Referees</b></TableCell>
                        <TableCell align="lefr"><b>Bias</b></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <If condition={selects === "Fenerbahçe - Hatayspor"}>
                    <Then>
                      <span>
                    {Matches_1.sort((a, b) => {return(-parseInt(a.rating) + parseInt(b.rating))}).map((match) => (
                        <TableRow key={match.desc}>
                        <TableCell>{match.desc}</TableCell>
                        <TableCell align="center"><Avatar src={`./Refereeimages/${match.image}`} sx={{ width: 140, height: 180 }}/></TableCell>
                        <TableCell align="center"><p>{match.first_name}</p></TableCell>
                        <TableCell align="left" key="rating">
                            <TableSortLabel active={true}>
                            <p>{(match.rating)}</p>
                            </TableSortLabel>
                          </TableCell>               
                        </TableRow>                      
                    ))}
                    </span>
                      </Then>
                    </If>            
                    </TableBody>
                    <If condition={selects === "Sivasspor - Galatasaray"}>
                    <Then>
                      <span>
                      {Matches_2.sort((a, b) => {return(-parseInt(a.rating) + parseInt(b.rating))}).map((match) => (
                        <TableRow key={match.desc}>
                        <TableCell>{match.desc}</TableCell>
                        <TableCell align="center"><Avatar src={`./Refereeimages/${match.image}`} sx={{ width: 140, height: 180 }}/></TableCell>
                        <TableCell align="center"><p>{match.first_name}</p></TableCell>
                        <TableCell align="left" key="rating">
                            <TableSortLabel active={true}>
                            <p>{(match.rating)}</p>
                            </TableSortLabel>
                          </TableCell>               
                        </TableRow>                      
                    ))}
                    </span>
                      </Then>
                    </If> 
                    <If condition={selects === "Beşiktaş - Adana Demirspor"}>
                    <Then>
                      <span>
                      {Matches_3.sort((a, b) => {return(-parseInt(a.rating) + parseInt(b.rating))}).map((match) => (
                        <TableRow key={match.desc}>
                        <TableCell>{match.desc}</TableCell>
                        <TableCell align="center"><Avatar src={`./Refereeimages/${match.image}`} sx={{ width: 140, height: 180 }}/></TableCell>
                        <TableCell align="center"><p>{match.first_name}</p></TableCell>
                        <TableCell align="left" key="rating">
                            <TableSortLabel active={true}>
                            <p>{(match.rating)}</p>
                            </TableSortLabel>
                          </TableCell>               
                        </TableRow>                      
                    ))}
                    </span>
                      </Then>
                    </If>   
                </Table>
              </TableContainer>
            </div>
          </div>
        </Grid>
    </ThemeProvider>
    );
}
export default RefereeRankings;
