import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_API_LOCAL : process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;