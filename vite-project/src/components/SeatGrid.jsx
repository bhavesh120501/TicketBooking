import React from 'react';

export const SeatGrid = ({ seats, handleSeatSelect }) => {
  const ROW_SIZE = 7;
  const SEATS_IN_LAST_ROW = 3;

  // Split seats into rows
  const rows = [];
  for (let i = 0; i < 12; i++) {
    const startIndex = i * ROW_SIZE;
    const endIndex = (i === 11) ? startIndex + SEATS_IN_LAST_ROW : startIndex + ROW_SIZE;
    rows.push(seats.slice(startIndex, endIndex));
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-auto max-h-96">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex justify-start gap-2 w-full flex-wrap ${rowIndex === 11 ? 'justify-center' : 'justify-center'}`} // Adjust for last row
        >
          {row.map((seat, seatIndex) => {
            const seatNumber = rowIndex * ROW_SIZE + seatIndex + 1;
            return (
              <div
                key={seatNumber}
                className={`w-10 h-8 text-center rounded cursor-pointer flex items-center justify-center 
                  ${seat === 0 ? 'bg-green-500' : seat === 1 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                onClick={() => handleSeatSelect(seatNumber - 1)} // Adjust for zero-based index
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
