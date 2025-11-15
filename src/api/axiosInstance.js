import axios from 'axios';

const API_URL = 'https://social-events-server-five.vercel.app/';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('firebaseToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
