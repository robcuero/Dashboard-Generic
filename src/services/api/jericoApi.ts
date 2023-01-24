import axios from 'axios';
import { useNavigate } from 'react-router';

const rest = axios.create({
  baseURL: 'https://localhost:44396/api'
});

rest.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

rest.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      const navigate = useNavigate();
      sessionStorage.removeItem('token');
      return navigate('/');
    }

    return Promise.reject(err);
  }
);
export default rest;
