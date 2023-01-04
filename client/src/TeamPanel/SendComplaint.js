//import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material/styles";
import axios from "axios";
import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

const theme = createTheme();

export default function SendComplaint() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [complaintList, setComplaintList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("ref_name")) {
      alert("Please enter a valid referee name.");
      return;
    }

    axios
      .get("/api/v1", {
        params: {
          _collection: "complaints",
          ref_name: data.get("ref_name"),
          email: location.state.email,
        },
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res && res.data.items.length !== 0) {
          alert("You already have an active complaint about this referee.");
          return;
        }
        if (res) {
          axios
            .post("/api/v1", {
              _collection: "complaints",
              email: location.state.email,
              ref_name: data.get("ref_name"),
              explanation: data.get("explanation"),
            })
            .catch((err) => {
              console.log(err);
            })
            .then((res) => {
              if (res && res.status === 200) {
                //navigate("/teampanel", { state: location.state });
                //alert("Complaint sent.");
                forceUpdate();
              } else {
                alert("An error occurred, please try again.");
              }
            });
        }
      });
  };

  const handleDelete = (val) => {
    const index = complaintList.indexOf(val);
    if (index > -1) {
      complaintList.splice(index, 1); //remove comment
    }
    axios.delete("/api/v1/", {
      data: {
        _collection: "complaints",
        _id: val._id
      }
    })
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            setComplaintList(complaintList);
            forceUpdate();
        });
}

  const getinfo = () => {
    axios
        .get("/api/v1", {
            params: {
                _collection: "complaints",
                email: location.state.email
            },
        })
        .then((res)=>{
        //console.log(res);
        setComplaintList(res.data.items);
    });
  };
  getinfo();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          my: 10,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Send complaint about a referee
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ref_name"
            name="ref_name"
            label="Referee Name"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="explanation"
            name="explanation"
            label="Explanation"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send
          </Button>
        </Box>
        <div className="Teams">
              <Typography component="h1" variant="h5" className="ref-container">
                <br></br>
                My Current Complaints
                <br></br>
              </Typography>
              <div className="RefData">
                <br></br>
                <table>
                    <thead>
                        <tr>
                            <th>Referee Name</th>
                            <th>Explanation</th>
                            <th></th>
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
                          return <div><Button variant="contained" startIcon={<ClearIcon />} onClick={() => handleDelete(val)}>
                            Cancel Complaint
                          </Button></div>;
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
      </Box>
    </>
  );
}
