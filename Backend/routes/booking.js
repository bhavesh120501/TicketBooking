const express = require('express');
const { bookSeats } = require('../controllers/bookController');
const router = express.Router();

// Add the route to book seats
router.post('/book-seats', bookSeats);

module.exports = router;
