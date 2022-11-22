import React from "react";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";

function NoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    return(
      <>
        <h1>No Page</h1>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>
                  navigate("/", { state: location.state })
              }
          >
              Return to Home Page
          </Button>
      </>
    );
}

export default NoPage;
