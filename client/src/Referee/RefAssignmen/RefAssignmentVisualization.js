// Page for visualizing referee assignments made by the algorithm
import React, { useState } from "react";
import UserMenu from "../../UserMenu/UserMenu";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Paper from "@mui/material/Paper";


export default function RefereeAssignmentVisualization() {
    const location = useLocation();
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    axios.get(
        "/api/v1/",
        {
            params: {
                _collection: "ref_assignments",
                }
            }
        )
        .catch((err) => {
            console.log(err);
        })
        .then((res) => {
            setAssignments(res.data.items);
        });
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Referee Assignments
                    </Typography>
                </Toolbar>
            </AppBar>
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
                {assignments.length === 0 ?
                    <Typography component="h1" variant="h5">
                        No assignments have been made yet
                    </Typography>
                    :
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                    >
                    <TableCell align="center">Home</TableCell>
                    <TableCell align="center">Away</TableCell>
                    <TableCell align="center">Referee</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {assignments.map((row) => (
                        <TableRow
                        key={row.referee}
                        sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                        >
                        <TableCell align="center">{row.home}</TableCell>
                        <TableCell align="center">{row.away}</TableCell>
                        <TableCell align="center">{row.referee}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    </Table>
                    </TableContainer>
                }
            </Box>
        </div>
    );
}