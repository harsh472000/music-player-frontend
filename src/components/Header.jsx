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
    <AppBar 
      position="fixed"  // Changed from 'static' to 'fixed'
      sx={{ 
        backgroundColor: "background.paper",
        zIndex: theme.zIndex.drawer + 1,  // Ensure header stays above other content
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"  // Optional: Add subtle shadow
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: "space-between",
          minHeight: "64px"  // Ensure consistent height
        }}
      >
        {/* Left side - App Name */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/dashboard"
          sx={{ 
            textDecoration: "none",
            color: "text.primary",
            fontWeight: "bold",
            "&:hover": {
              color: "primary.main"  // Add hover effect
            }
          }}
        >
          Music App
        </Typography>

        {/* Right side - Navigation and Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Navigation Links - Only show when user is logged in */}
          {userData && (
            <>
              <Button 
                component={Link} 
                to="/dashboard" 
                color="inherit"
                sx={{ 
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent"
                  }
                }}
              >
                Playlists
              </Button>
              <Button 
                component={Link} 
                to="/songs" 
                color="inherit"
                sx={{ 
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent"
                  }
                }}
              >
                Songs
              </Button>
            </>
          )}

          {/* Avatar with Menu */}
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
              width: 40,
              height: 40,
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.2s"
              }
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
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                minWidth: 200,
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
              <Avatar /> 
              <Box>
                <Typography variant="subtitle2">{userFirstName} {userLastName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {userData?.email || ""}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleLogout} 
              sx={{ 
                color: "error.main",
                "&:hover": {
                  backgroundColor: "error.light"
                }
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;