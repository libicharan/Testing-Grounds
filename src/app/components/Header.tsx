import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      {/* 👇 This Box adds top margin to push the page content below the AppBar */}
      <Box sx={{ height: "64px" }} /> {/* Adjust height based on AppBar size */}
    </>
  );
}
