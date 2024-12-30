import React, { useState } from 'react';

export const BookingForm = ({ maxSeats, onBookSeats, onReset, bookedSeatNumbers }) => {
  const [seatCount, setSeatCount] = useState(1); // Default seat count is 1

  const handleSeatCountChange = (e) => {
    setSeatCount(Math.min(e.target.value, maxSeats)); // Limit seat count to maxSeats
  };

  const handleBooking = () => {
    onBookSeats(seatCount);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Book Seats
        {bookedSeatNumbers.length > 0 && (
          <div className="ml-4 flex flex-wrap gap-2">
            {bookedSeatNumbers.map((seatNumber, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white font-semibold text-sm rounded-sm"
              >
                {seatNumber}
              </div>
            ))}
          </div>
        )}
      </h2>
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="seatCount" className="text-lg font-medium">Seats to Book:</label>
        <input
          type="number"
          id="seatCount"
          value={seatCount}
          onChange={handleSeatCountChange}
          min="1"
          max={maxSeats}
          className="p-2 border border-gray-300 rounded-md w-16 text-center"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Book Seats
        </button>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ml-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
