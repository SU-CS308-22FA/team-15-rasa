//import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Toolbar,} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";

export default function SeeFanComplaints() {
  const location = useLocation();
  const navigate = useNavigate();
  const [complaintList, setComplaintList] = useState([]);

  const getinfo = () => {
    axios
        .get("/api/v1", {
            params: {
                _collection: "fanComplaints"
            },
        })
        .then((res)=>{
        console.log(res);
        setComplaintList(res.data.items);
    });
  };
  getinfo();
    return(
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Rasa Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      <div className="Teams">
              <Typography component="h1" variant="h5" className="ref-container">
                <br></br>
                Complaints
                <br></br>
              </Typography>
              <div className="RefData">
                <br></br>
                <table>
                    <thead>
                        <tr>
                            <th>Complaint</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody id="data output">
                        <tr>
                            <th>{complaintList.map((val, key) => {
                            return <div>{val.explanation}</div>;
                        })}</th>
                            <th>{complaintList.map((val, key) => {
                            return <div>{val.email}</div>;
                        })}</th>
                        </tr>
                        <label></label>
                    </tbody>
                </table>  
                <br></br>  
                <br></br>  
                <br></br>  
              </div>
            </div>
      </main>
    </>
  );
}
