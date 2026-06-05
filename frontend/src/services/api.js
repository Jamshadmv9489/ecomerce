import axios from 'axios';

/**
 * Axios instance configured for API communication.
 * Includes global base URL, timeout, and credential support for HTTP-Only cookies.
 */
const api = axios.create({
    // Backend API base URL (defaults to localhost:5000 if env is missing)
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000,
    // Required to allow the browser to send/receive HTTP-Only cookies
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Response interceptor for handling global API errors.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Reject the promise so individual API calls can catch specific errors
        return Promise.reject(error);
    }
);

export default api;