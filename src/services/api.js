import axios from 'axios';

const API_URL = 'http://localhost:5156/api/Auth'; // Base URL for the API

// Function to register a new user
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

// Function to log in an existing user
export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/login`, userData);
};
