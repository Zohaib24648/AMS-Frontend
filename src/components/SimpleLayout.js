import React from 'react';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Paper, Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '400px',
    width: '100%',
  },
}));

const SimpleLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" className={classes.content}>
        <Paper elevation={6}>
          <Box p={3}>{children}</Box>
        </Paper>
      </Container>
    </div>
  );
};

export default SimpleLayout;
