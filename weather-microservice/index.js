const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const app = express();
const apiPort = 6002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World! - from weather service');
})


// Define a route to fetch time and date
app.get('/datetime', (req, res) => {
  const dateTime = new Date();
  res.json({ datetime: dateTime });
});

// Define a route to fetch weather information
app.get('/weather', async (req, res) => {
  try {
      // Make a request to a weather API (replace API_KEY and CITY with your own values)
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=30.09&lon=31.66&appid=412fda1993c37b9905d75dbf652ee7db`);
      const weatherData = response.data;
      res.json({ weather: weatherData });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weather data'+ error });
  }
});






app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
