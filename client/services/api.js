import axios from 'axios';

// Create an instance of axios with the base URL of our backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/url',
});

export default api;
