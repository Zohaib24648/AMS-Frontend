import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, CircularProgress, Link as MuiLink, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      const { user, token } = response.data;
      dispatch(setUser({ user, token, role: user.role }));
      toast.success('Login successful');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/attendance');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Glassmorphism effect
        backdropFilter: 'blur(10px)', // More glassmorphism
        borderRadius: '20px', // Rounded corners for modern look
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' // Soft shadow
      }}>
        <Typography component="h1" variant="h4" sx={{ marginBottom: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: '20px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <MuiLink component={Link} to="/register" color="primary">
              Sign Up
            </MuiLink>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
