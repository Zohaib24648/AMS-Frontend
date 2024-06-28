// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // A vibrant purple
      contrastText: '#ffffff', // Ensuring text is always light on dark backgrounds
    },
    secondary: {
      main: '#00b0ff', // Bright blue
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8',
      paper: 'rgba(255, 255, 255, 0.7)',
    },
    error: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#333',
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 400,
      color: '#333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          padding: '12px 30px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
          boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)', // Enhanced shadow for depth
          transition: 'transform 0.3s ease-in-out', // Smooth transform on hover
          '&:hover': {
            transform: 'scale(1.05)', // Slight scale on hover for interactive feedback
            backgroundColor: '#9c27b0', // Darken on hover
          }
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'secondary.main',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: 'secondary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'secondary.main',
              borderWidth: '2px',
            },
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'secondary.main',
          },
        },
      },
    },
  },
});

export default theme;
