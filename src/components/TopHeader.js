import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    justifyContent: 'center', // This centers the toolbar content
  },
  title: {
    flexGrow: 1,
    textAlign: 'center', // Ensures text is centered even if other elements are added later
  },
}));

const TopHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Attendance Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopHeader;
