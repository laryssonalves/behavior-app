import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.16:4444/',
});

export default api;
