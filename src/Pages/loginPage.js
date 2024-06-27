import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password, role);
      dispatch(setUser({ user: response.data.user, token: response.data.token, role: response.data.user.role }));
      setMessage(response.data.msg);

      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/attendance');
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'An error occurred.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
