import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { register } from '../services/authService';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Select, MenuItem, FormControl, InputLabel, Link, CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await register(email, password, name, role);
      dispatch(setUser({ user: response.data.user, token: response.data.token, role: response.data.user.role }));
      toast.success('Registration successful');
      if (response.data.user.role === 'admin') {
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
          Register
        </Typography>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <FormControl fullWidth variant="outlined" margin="normal" sx={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px' }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              {/* <MenuItem value="admin">Admin</MenuItem> */}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: '20px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" color="primary">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
