import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultAvatar = "https://i.pravatar.cc/150?img=5"; // fallback

  const RegisterUser = () => navigate("/register");
  const loginUser = () => navigate("/login");
  const logoutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo + Home */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            SDMS
          </Typography>
          
        </Box>

        {/* Right: Auth options */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Tooltip title="Home">
                <IconButton component={Link} to="/">
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              {/* Avatar + Username (tooltip on hover) */}
              <Tooltip title={user.details.username || "User"}>
                <Avatar
                  alt={user.username}
                  src={user.img || defaultAvatar}
                  sx={{ width: 32, height: 32 }}
                />
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton onClick={logoutUser} color="error">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Register">
                <IconButton onClick={RegisterUser} color="primary">
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Login">
                <IconButton onClick={loginUser} color="primary">
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
