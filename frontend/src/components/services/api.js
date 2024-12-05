import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  signup: (email, password) =>
    api.post('/auth/signup', { email, password }),
};

export const achievementService = {
  getAll: () => 
    api.get('/achievements'),
  
  create: (achievement) =>
    api.post('/achievements', achievement),
};
