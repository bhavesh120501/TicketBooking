import { useContext, useState } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { AuthContext } from './context/AuthContext'
import { SeatReservation } from './pages/SeatReservation'

function App() {
  const{user} = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/reserve" /> : <Navigate to="/signup" />}
      />
      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />
      {/* Login Page */}
      <Route path="/login" element={<Login />} />
      {/* Seat Reservation Page (Protected Route) */}
      <Route
        path="/reserve"
        element={user ? <SeatReservation /> : <Navigate to="/login" />}
      />{" "}
    </Routes>
  );
}

export default App
