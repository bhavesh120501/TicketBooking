const pool = require('../config/db');

exports.bookSeats = async (req, res) => {
  const { userId, bookedSeats } = req.body; // UserID from the frontend, bookedSeats is an array of seat numbers

  try {
    // Insert the booking into the database
    await pool.query(
      'INSERT INTO bookings (user_id, booked_seats) VALUES ($1, $2)',
      [userId, bookedSeats]
    );

    return res.status(201).json({ success: true, message: 'Seats booked successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
