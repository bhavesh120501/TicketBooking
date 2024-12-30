// models/Booking.js
const pool = require('../config/db'); // Importing the pg pool instance from config/db.js

// Function to create a new booking
const createBooking = async (user_id, seat_numbers, train_id) => {
  const query = `
    INSERT INTO bookings (user_id, seat_number, train_id, reservation_date)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [user_id, seat_numbers, train_id]; // Store the entire array of seats
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created booking
  } catch (err) {
    console.error('Error creating booking:', err);
    throw new Error('Error creating booking');
  }
};

// Function to get a booking by user ID
const getBookingByUserId = async (user_id) => {
  const query = 'SELECT * FROM bookings WHERE user_id = $1';
  const values = [user_id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the booking data for the user
  } catch (err) {
    console.error('Error fetching booking:', err);
    throw new Error('Error fetching booking');
  }
};

module.exports = { createBooking, getBookingByUserId };
