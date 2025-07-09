"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/navigation";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const routes = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Products", path: "/produts", icon: <DashboardIcon /> },
    { label: "jobposts", path: "/jobpost", icon: <InfoIcon /> },
    { label: "jobpostsadd", path: "/jobpost/add", icon: <InfoIcon /> },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleRouteClick = (path: string) => {
    router.push(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1100 }}>
        <Toolbar>
          {/* Left: Menu Drawer Toggle */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Center: Title */}
          <Typography
            className="text-red-300"
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            App Header
          </Typography>

          {/* Right: User Avatar and Menu */}
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer with navigation links */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {routes.map((route) => (
              <ListItem
                key={route.path}
                onClick={() => handleRouteClick(route.path)}
                component="button"
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Push content below AppBar */}
      <Box sx={{ height: 64 }} />
    </>
  );
}
