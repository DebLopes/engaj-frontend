import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('@Engaj:token');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;