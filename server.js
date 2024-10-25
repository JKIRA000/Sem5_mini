const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get flight details
app.get('/api/flight/:flightNumber', async (req, res) => {
    const flightNumber = req.params.flightNumber;
    const apiKey = process.env.AVIATIONSTACK_API_KEY;

    try {
        const response = await axios.get('http://api.aviationstack.com/v1/flights', {
            params: {
                access_key: apiKey,
                flight_iata: flightNumber
            }
        });

        const flightDetails = response.data.data[0]; // Assuming the first result is the desired one
        if (flightDetails) {
            res.json({
                airline: flightDetails.airline.name,
                departure: flightDetails.departure.airport,
                arrival: flightDetails.arrival.airport,
                status: flightDetails.status,
                departureTime: flightDetails.departure.estimated,
                arrivalTime: flightDetails.arrival.estimated
            });
        } else {
            res.json(null);
        }
    } catch (error) {
        console.error('Error fetching flight details:', error);
        res.status(500).json(null);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});