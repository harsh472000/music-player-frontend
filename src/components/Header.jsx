import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme
} from "@mui/material";
import { cookieStorage } from "../utils/cookie";

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    cookieStorage.removeItem("jwt_token");
    cookieStorage.removeItem("user_data");
    cookieStorage.clear();
    navigate("/login");
    handleClose();
  }

   const userData = JSON.parse(cookieStorage.getItem("user_data"));
  
  const userFirstName = userData ? userData.firstName : "Guest";
  const userLastName = userData ? userData.lastName : "";

  return (
    <AppBar position="static" sx={{ backgroundColor: "background.paper" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side - App Name */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            textDecoration: "none",
            color: "text.primary",
            fontWeight: "bold"
          }}
        >
          Music App
        </Typography>

        {/* Right side - Navigation and Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Navigation Links */}
          <Button 
            component={Link} 
            to="/dashboard" 
            color="inherit"
            sx={{ color: "text.primary" }}
          >
            Playlists
          </Button>
          <Button 
            component={Link} 
            to="/songs" 
            color="inherit"
            sx={{ color: "text.primary" }}
          >
            Songs
          </Button>

          {/* Avatar with Menu */}
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
              width: 40,
              height: 40
            }}
            onClick={handleClick}
          >
            {userFirstName ? userFirstName.charAt(0) : "U"}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> {userFirstName} {userLastName}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;