import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useLocation, useNavigate} from "react-router-dom";

export default function UserMenu({stateChanger}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/userprofile", { state: location.state });
  };
  const handleLogout = () => {
    location.state = null;
    window.localStorage.clear();
    setAnchorEl(null);
    navigate("/", { state: location.state });
  };
  const handleAccountSettings = () => {
    setAnchorEl(null);
    navigate("/accountsettings", { state: location.state });
  };
  const handleHome = () => {
    setAnchorEl(null);
    navigate("/", { state: location.state });
  };

  return (
    <div>
      {location.state && location.state.username ? (
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {location.state.username}
        </Button>
      ) : (
        <Button
          onClick={() => {
            navigate("/signin", { state: { ...location.state, from: location.pathname } })
          }
        }
        >
            Sign In
        </Button>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleAccountSettings}>Account Settings</MenuItem>
        {
          location.pathname && location.pathname !== "/" ?
              <MenuItem onClick={handleHome}>Home Page</MenuItem>
              : null
        }
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
