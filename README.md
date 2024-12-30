TicketBooking
The TicketBooking project is a web application that enables users to securely sign up, log in, and make seat reservations for events or travel. The system is built with a React.js frontend, an Express backend, and a PostgreSQL database to ensure smooth functionality and data persistence.

Features
User Authentication: Allows users to securely sign up and log in using password hashing for enhanced security.
Seat Reservation: Logged-in users can book seats based on availability, with real-time updates of booked and available seats.
Frontend: Developed with React.js, providing a dynamic user interface, interactive seat grid, and user-friendly experience.
Backend: Powered by Express.js, handling API requests, user authentication, and seat reservation logic.
Database: PostgreSQL is used for storing user information, reservation data, and ensuring efficient data management.
Technology Stack
Frontend: React.js
Styles: Tailwind CSS
Backend: Express.js
Database: PostgreSQL
Authentication: Secure login with password hashing (bcrypt)
How It Works
Sign Up: Users can create an account by providing an email and a secure password.
Login: After signing up, users can log in using their email and password.
Seat Reservation: Once logged in, users can view available seats and reserve them dynamically. The system ensures that only contiguous seats within a row are booked.
Database: User credentials and reservation data are stored securely in PostgreSQL, ensuring data integrity and persistence.
