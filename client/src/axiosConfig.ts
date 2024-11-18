import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000';


axios.defaults.timeout = 10000;


axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
