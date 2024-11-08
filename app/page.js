
'use client'
import React, { useState } from 'react';

const App = () => {
  // Initial seat layout (11 rows of 7 seats, 1 row of 3 seats)
  const initialSeats = [
    new Array(7).fill(true), new Array(7).fill(true), new Array(7).fill(true),
    new Array(7).fill(true), new Array(7).fill(true), new Array(7).fill(true),
    new Array(7).fill(true), new Array(7).fill(true), new Array(7).fill(true),
    new Array(7).fill(true), new Array(7).fill(true), new Array(3).fill(true)
  ];

  // State to track the seat availability
  const [seats, setSeats] = useState(initialSeats);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle booking
  const handleBookSeats = (numSeats) => {
    setErrorMessage('');

    if (numSeats < 1 || numSeats > 7) {
      setErrorMessage('You can only book between 1 and 7 seats at a time.');
      return;
    }

    let availableSeats = [];
    let booked = [];

    // Try to book seats
    for (let i = 0; i < seats.length; i++) {
      const row = seats[i];
      const rowAvailable = row.reduce((acc, seat, index) => {
        if (seat) acc.push(index);
       
        return acc;
      }, []);
      
      // If enough seats are available in this row, book them
      if (rowAvailable.length >= numSeats) {
        booked = rowAvailable.slice(0, numSeats).map(seatIndex => i * 100 + seatIndex + 1);
        availableSeats = [...rowAvailable.slice(numSeats)];
        rowAvailable.slice(0, numSeats).forEach(index => row[index] = false);
        break;
      } 
      

      if (numSeats === 0) break;
    }
     if(booked.length ==0&& numSeats!=0){
      for (let i = 0; i < seats.length; i++) {
        const row = seats[i];
        const rowAvailable = row.reduce((acc, seat, index) => {
          if (seat) acc.push(index);
         
          return acc;
        }, []);
        if (rowAvailable.length >= numSeats) {
          booked = rowAvailable.slice(0, numSeats).map(seatIndex => i * 100 + seatIndex + 1);
          availableSeats = [...rowAvailable.slice(numSeats)];
          rowAvailable.slice(0, numSeats).forEach(index => row[index] = false);
          break;
        } else {
         
         booked = booked.concat(rowAvailable.map(seatIndex => i * 100 + seatIndex + 1));
         rowAvailable.forEach(index => row[index] = false);
        numSeats -= rowAvailable.length;
        }
        if (numSeats === 0) break;
      }
     }
    if (booked.length === 0) {
      setErrorMessage('Sorry, unable to book the requested number of seats.');
    } else {
      setSeats([...seats]);
      setBookedSeats([...bookedSeats, ...booked]);
    }
  };

  // Function to render the seats
  const renderSeats = () => {
    return seats.map((row, rowIndex) => (
      <div key={rowIndex} className="flex mb-2 justify-center">
        {row.map((seat, seatIndex) => {
          const seatNumber = rowIndex * 100 + seatIndex + 1;
          return (
            <button
              key={seatIndex}
              className={`w-12 h-12 mx-1 flex items-center justify-center border rounded-lg ${
                seat ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 cursor-not-allowed'
              }`}
              disabled={!seat}
              onClick={() => {}}
            >
              {seat ? seatNumber : 'X'}
            </button>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Train Seat Reservation System</h1>
      <div className="seat-chart mb-6">
        {renderSeats()}
      </div>

      <div className="controls text-center">
        <div className="mb-4">
          <input
            type="number"
            min="1"
            max="7"
            placeholder="Number of Seats"
            className="border border-gray-300 p-2 rounded-lg"
            id="numSeats"
          />
          <button
            onClick={() => handleBookSeats(parseInt(document.getElementById('numSeats').value))}
            className="ml-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Book Seats
          </button>
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <div className="mt-4">
          <h3 className="font-semibold">Booked Seats:</h3>
          <ul className="list-disc list-inside mt-2">
            {bookedSeats.map(seat => (
              <li key={seat}>Seat {seat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
