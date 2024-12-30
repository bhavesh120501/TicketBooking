import React from 'react';

export const SeatSummary = ({ bookedSeats, availableSeats }) => {
  return (
    <div className="flex justify-center gap-2 mt-2">
      <div className="bg-yellow-500 text-white rounded-full px-6 py-2">
        Booked Seats: {bookedSeats}
      </div>
      <div className="bg-green-500 text-white rounded-full px-4 py-2">
        Available Seats: {availableSeats}
      </div>
    </div>
  );
};
