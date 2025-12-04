const express = require('express');  // Includes "express" module
const cors = require('cors'); // Includes "cors" module
const db = require('./database');
const authRoute = require('./routes/auth');

const app = express(); // Sets app as variable to perform actions on created express() element
const PORT = 3000; // Set port
const HOST = '0.0.0.0'; // Listen on all interfaces

// Middleware
app.use(cors()); // Sets cors header to allow access from different ports/ips
app.use(express.json()); // Parses incoming JSON request bodies

app.use('/api', authRoute);

// Creates test route to check if server is running
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server läuft!' });
});

// Starts server on port 3000 and logs confirmation
app.listen(PORT, HOST, () => {
    console.log(`Backend läuft auf http://${HOST}:${PORT}`);
});