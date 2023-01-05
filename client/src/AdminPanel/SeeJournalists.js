//import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";



export default function SeeJournalists() {
  const location = useLocation();
  const navigate = useNavigate();
  const [complaintList, setComplaintList] = useState([]);
  //const asd = getdata();

  const getinfo = () => {
    axios
      .get("/api/v1", {
        params: {
          _collection: "journalists",
        },
      })
      .then((res) => {
        console.log(res);
        setComplaintList(res.data.items);
      });
  };
  const updateJournalist = (username, email, image, password, _id) => {
    axios
      .put("/api/v1", {
        _collection: "journalists",
        confirmed: "true",
        username: username,
        email: email,
        password: password,
        image: image,
        _id: _id,
      })
      .then(alert("Journalist successfully verified:)"));
  };
  getinfo();
  return (
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
            Journalist registrations
            <br></br>
          </Typography>
          <div className="RefData">
            <br></br>
            <table border="4">
              <tr>
                {complaintList.map((val, key) => {
                  if (val.confirmed === "false") {
                    return <td>{val.username}</td>;
                  }
                })}
              </tr>
              <tr>
                {complaintList.map((val, key) => {
                  if (val.confirmed === "false") {
                    return <td>{val.email}</td>;
                  }
                })}
              </tr>
              <tr>
                {complaintList.map((val, key) => {
                  if (val.confirmed === "false") {
                    return (
                      <td>
                        <img height="200" width="200" src={`${val.image}`} />
                      </td>
                    );
                  }
                })}
              </tr>
              <tr>
                {complaintList.map((val, key) => {
                  if (val.confirmed === "false") {
                    return (
                      <td>
                        <Button
                          onClick={() =>
                            updateJournalist(
                              val.username,
                              val.email,
                              val.image,
                              val.password,
                              val._id
                            )
                          }
                          variant="contained"
                        >
                          Accept journalist
                        </Button>
                      </td>
                    );
                  }
                })}
              </tr>
              <label></label>
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
