import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    background: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    color: theme.palette.text.primary,
  },
  listItemIcon: {
    color: theme.palette.primary.main,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
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
        <ListItem button onClick={handleLogout} className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
