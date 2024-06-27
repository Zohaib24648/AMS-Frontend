import React from 'react';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SimpleLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

export default SimpleLayout;
