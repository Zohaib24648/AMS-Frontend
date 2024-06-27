import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Typography, Paper, TextField, Button, Box, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/profile/details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast.error('Error fetching user profile');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token, fetchUserProfile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3001/api/profile/update', {
        name,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully');
      fetchUserProfile();
    } catch (error) {
      toast.error('An error occurred while updating the profile');
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await axios.post('http://localhost:3001/api/profile/uploadPicture', {
          base64Image: reader.result,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Profile picture updated successfully');
        fetchUserProfile();
      } catch (error) {
        toast.error('An error occurred while updating the profile picture');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>User Profile</Typography>
      {user && (
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <Avatar src={profilePicture || 'default-profile.png'} alt="Profile" sx={{ width: 150, height: 150 }} />
          </Box>
          <form onSubmit={handleUpdateProfile}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
                required
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                required
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>Change Profile Picture</Typography>
              <Button variant="contained" component="label">
                Upload
                <input type="file" hidden onChange={handleProfilePictureChange} />
              </Button>
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update Profile
            </Button>
          </form>
          {message && <Typography sx={{ color: 'green', mt: 2 }}>{message}</Typography>}
        </Paper>
      )}
    </Container>
  );
};

export default UserProfilePage;
