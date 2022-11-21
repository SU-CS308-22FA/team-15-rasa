import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  return(
      <>
        <h1>User Profile Page (not implemented yet)</h1>
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
