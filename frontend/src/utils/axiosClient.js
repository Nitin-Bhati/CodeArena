import axios from "axios"

const axiosClient =  axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a response interceptor for easier debugging
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error('Network Error: Please check if your backend server is running and accessible.');
        } else {
            console.error(`API Error (${error.response.status}):`, error.response.data);
        }
        return Promise.reject(error);
    }
);


export default axiosClient;

