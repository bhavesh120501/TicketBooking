const { createBooking, getBookingByUserId, getBookedSeatsByTrainId } = require('../models/Booking');

// Save ticket bookings for a user
exports.bookTickets = async (req, res) => {
  const { userId, seats, train_id } = req.body; // Add userId in the request body

  try {
    // Check if the user already has a booking
    const existingBooking = await getBookingByUserId(userId);
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'You already have a booking.' });
    }

    // Check if the selected seats are available
    const bookedSeats = await getBookedSeatsByTrainId(train_id); // Get already booked seats for the given train
    const unavailableSeats = seats.filter((seat) => bookedSeats.includes(seat));
    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seats ${unavailableSeats.join(', ')} are already booked. Please select other seats.`,
      });
    }

    // Save the booking to the database
    const newBooking = await createBooking(userId, seats, train_id);
    return res.json({ success: true, message: 'Seats booked successfully', booking: newBooking });
  } catch (error) {
    console.error('Error booking seats:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Fetch booked seats for a user
exports.getBookedSeats = async (req, res) => {
  const { userId } = req.body; // Add userId in the request body

  try {
    const booking = await getBookingByUserId(userId);
    if (!booking) {
      return res.json({ success: true, bookedSeats: [] }); // No booking found
    }
    return res.json({ success: true, bookedSeats: booking.seat_number }); // Assuming seat_number is an array
  } catch (error) {
    console.error('Error fetching booked seats:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
