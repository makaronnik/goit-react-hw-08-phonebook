import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const axiosClient = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = token => {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  axiosClient.defaults.headers.common.Authorization = '';
};

export default axiosClient;
