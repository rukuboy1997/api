const express = require('express');
const axios = require('axios');
const app = express();

// GET /api/hello endpoint
app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  const clientIP = req.ip; // Retrieve client IP

  try {
    // Fetch location information based on client IP from ipinfo.io
    const ipInfoResponse = await axios.get(`https://ipinfo.io/${clientIP}?token=28d61fa433e5d6`);
    const { city } = ipInfoResponse.data;

    // Fetch temperature from OpenWeatherMap (replace with your API key and proper endpoint)
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3aa72388968c48f0ca5bdfc61dc5961a&units=metric`);
    const temperature = weatherResponse.data.main.temp;

    // Example response with dynamic temperature
    const response = {
      client_ip: clientIP,
      location: city || 'Unknown',
      greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${city}.`
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
