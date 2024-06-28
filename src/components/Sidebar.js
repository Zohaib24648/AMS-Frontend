import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../slices/authSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: '#000000',
      color: '#000000',
    },
  },
  listItemIcon: {
    color: theme.palette.primary.contrastText,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmLogout = () => {
    handleClose();
    handleLogout();
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.logo}>AMS</div>
       
        <List>
          <ListItem button component={Link} to="/profile" className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          {role === 'admin' && (
            <>
              <ListItem button component={Link} to="/admin" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/admin/attendance" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItem>
              <ListItem button component={Link} to="/admin/create-attendance" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Create Attendance" />
              </ListItem>
              <ListItem button component={Link} to="/admin/leaves" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Leaves" />
              </ListItem>
              <ListItem button component={Link} to="/admin/leave-request-history" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Leave Request History" />
              </ListItem>
              <ListItem button component={Link} to="/admin/grade-criteria" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Grade Criteria" />
              </ListItem>
            </>
          )}
          {role === 'user' && (
            <>
              <ListItem button component={Link} to="/attendance" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItem>
              <ListItem button component={Link} to="/leaves" className={classes.listItem}>
                <ListItemIcon className={classes.listItemIcon}><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Leaves" />
              </ListItem>
            </>
          )}
          <ListItem button onClick={handleClickOpen} className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
