//import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import {useLocation, useNavigate} from "react-router-dom";
import {AppBar, Toolbar,} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

/*async function getdata(){
    axios
        .get("/api/v1", {
            params: {
                _collection: "complaints"
            },
        })
        .catch((err) => {
            console.log(err);
            console.log("something is wrong");
        })
        .then((res)=>{
            console.log("data recieved");
            console.log(res);
            return res.data.items;
        })
        .then(function(items){
            let placeholder = document.querySelector("#data-output");
            console.log(placeholder);
            let out = "";
            for(let item of items){
                console.log(item);
                console.log(item.ref_name);
                console.log(item.explanation);
                console.log(item.email);
                out+=`
                    <tr>
                        <td> ${item.ref_name} </td>
                        <td> ${item.explanation} </td>
                        <td> ${item.email} </td>
                    </tr>
                `;
            }
            console.log(out);
            console.log(placeholder);
            return out;
            placeholder.innerHTML = out;
        })
  }*/

export default function SeeComplaints() {
  const location = useLocation();
  const navigate = useNavigate();
  const [complaintList, setComplaintList] = useState([]);
  //const asd = getdata();

  const getinfo = () => {
    axios
        .get("/api/v1", {
            params: {
                _collection: "complaints"
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
                            <th>Referee Name</th>
                            <th>Explanation</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    <tbody id="data output">
                        <tr>
                            <th>{complaintList.map((val, key) => {
                            return <div>{val.ref_name}</div>;
                        })}</th>
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
