"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Checkbox,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Slider,
  Select,
  InputLabel,
  FormGroup,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  LinearProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Badge,
  Chip,
  Pagination,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MaterialUITestPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  return (
    <>
      {/* AppBar with Menu */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MUI Component Test
          </Typography>
          <Button color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem component="button" key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Form Components</Typography>

            <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField fullWidth label="Name" />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth label="Email" />
                </Grid>
                <Grid size={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Subscribe"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable notifications"
                    />
                  </FormGroup>
                </Grid>
                <Grid size={{ xs: 6, md: 8 }}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row defaultValue="male">
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Select an Option</InputLabel>
                    <Select
                      labelId="select-label"
                      value={selectValue}
                      label="Select an Option"
                      onChange={(e) => setSelectValue(e.target.value)}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormLabel>Slider</FormLabel>
                  <Slider defaultValue={30} />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setSnackbarOpen(true)}
                >
                  Show Snackbar
                </Button>{" "}
                <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                  Show Dialog
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Tabs</Typography>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
          </Tabs>
          {tabValue === 0 && (
            <Typography sx={{ mt: 2 }}>Content for Tab 1</Typography>
          )}
          {tabValue === 1 && (
            <Typography sx={{ mt: 2 }}>Content for Tab 2</Typography>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Feedback Components</Typography>
          <Alert severity="info">This is an info alert</Alert>
          <Box sx={{ my: 2 }}>
            <CircularProgress />
          </Box>
          <LinearProgress />
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message="This is a snackbar"
        onClose={() => setSnackbarOpen(false)}
      />

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Sample Dialog</DialogTitle>
        <DialogContent>
          <Typography>This is a dialog box.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Other MUI Components</Typography>

        {/* Breadcrumbs */}
        <Typography sx={{ mt: 2 }}>Breadcrumbs</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Core
          </Link>
          <Typography color="text.primary">Breadcrumb</Typography>
        </Breadcrumbs>

        {/* Chip */}
        <Typography sx={{ mt: 2 }}>Chips</Typography>
        <Chip label="Basic Chip" />
        <Chip label="Clickable Chip" onClick={() => alert("Clicked!")} />

        {/* Avatar */}
        <Typography sx={{ mt: 2 }}>Avatar</Typography>
        <Avatar alt="User" src="https://i.pravatar.cc/40" />
        <Avatar>U</Avatar>

        {/* Badge */}
        <Typography sx={{ mt: 2 }}>Badge</Typography>
        <Badge badgeContent={4} color="primary">
          <MailIcon />
        </Badge>

        {/* Pagination */}
        <Typography sx={{ mt: 2 }}>Pagination</Typography>
        <Pagination count={10} color="primary" />

        {/* Accordion */}
        <Typography sx={{ mt: 2 }}>Accordion</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>This is the content of Accordion 1</Typography>
          </AccordionDetails>
        </Accordion>

        {/* Tooltip */}
        <Typography sx={{ mt: 2 }}>Tooltip</Typography>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}
