import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, CircularProgress, Link as MuiLink } from '@mui/material';
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
    <Container maxWidth="xs" sx={{ backgroundColor: '#fff', padding: 4, borderRadius: 2, boxShadow: 3 }}>
      <Box 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
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
      </Box>
    </Container>
  );
};

export default LoginPage;
