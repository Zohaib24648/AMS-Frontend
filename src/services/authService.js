// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const login = (email, password, role) => {
  return axios.post(`${API_URL}/login`, { email, password, role });
};

export const register = (email, password, name, role) => {
  return axios.post(`${API_URL}/register`, { email, password, name, role });
};
