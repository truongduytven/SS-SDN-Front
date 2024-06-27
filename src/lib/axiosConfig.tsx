import axios from 'axios';

const watchAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
});

watchAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default watchAPI;