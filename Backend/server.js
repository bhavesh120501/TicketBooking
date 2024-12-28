const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

// Use authentication routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
