import React, { useState } from 'react';
import { SeatGrid } from '../components/SeatGrid';
import { BookingForm } from '../components/BookingForm';
import { SeatSummary } from '../components/SeatSummary';

export const SeatReservation = () => {
  const TOTAL_SEATS = 80;
  const ROW_SIZE = 7;
  const SEATS_IN_LAST_ROW = 3;

  const [seats, setSeats] = useState(Array(TOTAL_SEATS).fill(0)); // 0 = Available, 1 = Selected, 2 = Booked
  const [bookedSeatNumbers, setBookedSeatNumbers] = useState([]); // To track booked seat numbers

  const handleSeatSelect = (index) => {
    const updatedSeats = [...seats];
    if (updatedSeats[index] === 0) {
      updatedSeats[index] = 1; // Mark as selected
    } else if (updatedSeats[index] === 1) {
      updatedSeats[index] = 0; // Unselect
    }
    setSeats(updatedSeats);
  };

  const handleBookSeats = (count) => {
    const updatedSeats = [...seats];
    let bookedSeats = [];
    let remainingSeats = count;

    // Step 1: Try to book seats in contiguous blocks within rows
    for (let row = 0; row < 12; row++) {
      const start = row * ROW_SIZE;
      const end = row === 11 ? start + SEATS_IN_LAST_ROW : start + ROW_SIZE;
      const rowSeats = updatedSeats.slice(start, end);

      // If the row has fewer seats than required, skip it
      if (rowSeats.filter(seat => seat === 0).length < remainingSeats) continue; // Skip rows that don't have enough available seats

      // Try to book contiguous seats within this row
      let availableSeatsInRow = [];
      for (let i = 0; i < rowSeats.length; i++) {
        if (rowSeats[i] === 0) {
          availableSeatsInRow.push(i);
        } else {
          // If contiguous seats are enough, book them
          if (availableSeatsInRow.length >= remainingSeats) {
            bookedSeats.push(...availableSeatsInRow.slice(0, remainingSeats).map(seatIndex => start + seatIndex));
            remainingSeats = 0;
            break;
          }
          remainingSeats -= availableSeatsInRow.length;
          bookedSeats.push(...availableSeatsInRow.map(seatIndex => start + seatIndex));
          availableSeatsInRow = [];
        }
      }

      // After loop, check if there are enough contiguous seats left in the row
      if (availableSeatsInRow.length >= remainingSeats) {
        bookedSeats.push(...availableSeatsInRow.slice(0, remainingSeats).map(seatIndex => start + seatIndex));
        remainingSeats = 0;
        break;
      } else if (availableSeatsInRow.length > 0) {
        bookedSeats.push(...availableSeatsInRow.map(seatIndex => start + seatIndex));
        remainingSeats -= availableSeatsInRow.length;
      }

      if (remainingSeats === 0) break;
    }

    // Step 2: If there are remaining seats, book them across rows
    if (remainingSeats > 0) {
      for (let row = 0; row < 12; row++) {
        const start = row * ROW_SIZE;
        const end = row === 11 ? start + SEATS_IN_LAST_ROW : start + ROW_SIZE;
        const rowSeats = updatedSeats.slice(start, end);

        let availableSeatsInRow = [];
        for (let i = 0; i < rowSeats.length; i++) {
          if (rowSeats[i] === 0) {
            availableSeatsInRow.push(i);
          }
        }

        if (availableSeatsInRow.length > 0) {
          bookedSeats.push(...availableSeatsInRow.slice(0, remainingSeats).map(seatIndex => start + seatIndex));
          remainingSeats -= availableSeatsInRow.length;
        }

        if (remainingSeats === 0) {
          break;
        }
      }
    }

    // Step 3: If there are still remaining seats after all attempts, show an error
    if (remainingSeats > 0) {
      alert('Not enough seats available.');
      return;
    }

    // Step 4: Mark the booked seats as '2' (Booked)
    bookedSeats.forEach(seatIndex => {
      updatedSeats[seatIndex] = 2;
    });

    // Update the seat state to reflect the booking
    setSeats(updatedSeats);

    // Update the booked seat numbers state
    setBookedSeatNumbers(bookedSeats.map(seat => seat + 1)); // Convert to 1-based seat numbers

    // Notify the user about the booked seats
    alert(`Successfully booked seats: ${bookedSeats.map(seat => seat + 1).join(', ')}`);
  };

  // Reset all seat bookings
  const handleReset = () => {
    setSeats(Array(TOTAL_SEATS).fill(0)); // Reset all seats to available
    setBookedSeatNumbers([]); // Reset booked seat numbers
  };

  const bookedSeats = seats.filter((seat) => seat === 2).length;
  const availableSeats = seats.filter((seat) => seat === 0).length;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mt-6 p-2 h-screen space-y-4 md:space-y-0">
      <div className="w-full md:w-2/3 flex flex-col items-center">
        <h1 className="text-xl font-bold">Ticket Booking</h1>
        <SeatGrid seats={seats} handleSeatSelect={handleSeatSelect} />
        <SeatSummary bookedSeats={bookedSeats} availableSeats={availableSeats} />
      </div>
      <div className="w-full md:w-1/3 flex justify-center items-center mt-4 md:mt-0">
        <BookingForm
          maxSeats={7}
          onBookSeats={handleBookSeats}
          onReset={handleReset}
          bookedSeatNumbers={bookedSeatNumbers} // Pass the booked seat numbers
        />
      </div>
    </div>
  );
};
