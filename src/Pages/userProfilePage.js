import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
      setMessage('Profile updated successfully');
      fetchUserProfile();
    } catch (error) {
      setMessage('An error occurred.');
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
        setMessage('Profile picture updated successfully');
        fetchUserProfile();
      } catch (error) {
        setMessage('An error occurred.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          <div>
            <img src={profilePicture || 'default-profile.png'} alt="Profile" width="150" height="150" />
          </div>
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit">Update Profile</button>
          </form>
          <div>
            <label>Change Profile Picture:</label>
            <input type="file" onChange={handleProfilePictureChange} />
          </div>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
