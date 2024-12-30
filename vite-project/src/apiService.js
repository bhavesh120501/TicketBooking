import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this to your backend URL

// User Signup
export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Book Tickets
export const bookTickets = async (userId, bookedSeats) => {
  try {
    const response = await axios.post(`${API_URL}/book-tickets`, { userId, bookedSeats });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch Booked Seats
export const getBookedSeats = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/booked-seats/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
