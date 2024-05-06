import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // Importing React Router components
import apis from "./api/index.js";
import { useHistory } from 'react-router-dom';

const styles = {
  app: {
    textAlign: 'center',
    backgroundColor: '#282c34', // Set the background color of the entire page
    minHeight: '97vh', // Ensure the app covers the full height of the viewport
  },
  header: {
    backgroundColor: '#282c34',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    padding: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#4CAF50',
  },
  weatherInfo: {
    marginTop: '20px',
  },
};

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [weatherApiError, setWeatherApiError] = useState(false);
  const [dateTimeApiError, setDateTimeApiError] = useState(false);
  const [autoUpdateWeather, setAutoUpdateWeather] = useState(true);
  const [autoUpdateDateTime, setAutoUpdateDateTime] = useState(true);
  const navigate = useHistory();

  useEffect(() => {
    // Fetch weather data from your API endpoint if auto update is enabled
    if (autoUpdateWeather) {
      fetchWeatherData();
    }
  }, [autoUpdateWeather]);

  useEffect(() => {
    // Fetch date and time data if auto update is enabled
    if (autoUpdateDateTime) {
      fetchDateTime();
    }
  }, [autoUpdateDateTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch date and time data if auto update is enabled
      if (autoUpdateDateTime) {
        fetchDateTime();
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [autoUpdateDateTime]);

  const fetchWeatherData = async () => {
    try {
      const response = await apis.weather(); 
      if (response.status === 200) {
        const data = response.data; 
        // Convert temperature from Kelvin to Celsius
        const temperatureCelsius = data.weather.main.temp - 273.15;
        // Check if weather data has changed
        if (!weatherData || JSON.stringify(weatherData) !== JSON.stringify(data.weather)) {
          setWeatherData({ ...data.weather, main: { ...data.weather.main, temp: temperatureCelsius }});
        }
      } else {
        setWeatherData(null)
        setWeatherApiError(true);
        console.error('Failed to fetch weather data. Status:', response.status);
      }
    } catch (error) {
      setWeatherData(null)
      setWeatherApiError(true);
      console.error('Error fetching weather data:', error);
    }
    // Schedule the next check after 5 minutes if auto update is enabled
    if (autoUpdateWeather) {
      setTimeout(fetchWeatherData,  1000);
    }
  };

  const fetchDateTime = async () => {
    try {
      const response = await apis.dateTime(); 
      if (response.status === 200) {
          const data = response.data;
          setDateTime(new Date(data.datetime));
      } else {
          setDateTime(null); // Reset dateTime to null if API call fails
          setDateTimeApiError(true);
          console.error('Failed to fetch date and time. Status:', response.status);
      }
    } catch (error) {
      setDateTime(null); // Reset dateTime to null if API call fails
      setDateTimeApiError(true);
      console.error('Error fetching date and time:', error);
    }
  };

  const handleToggleAutoUpdateWeather = () => {
    setAutoUpdateWeather(prevState => !prevState);
  };

  const handleToggleAutoUpdateDateTime = () => {
    setAutoUpdateDateTime(prevState => !prevState);
  };

  const handleUpdateWeather = () => {
    fetchWeatherData();
  };

  const handleUpdateDateTime = () => {
    fetchDateTime();
  };

  return (
    <Router>
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.appBar}>
            <div style={styles.logo}>Time And Weather API</div>
            <div style={styles.buttonContainer}>

              {/* <Link  style={{ textDecoration: 'none' }}>
                <button style={styles.button}>Product</button>
              </Link> */}
              <button style={styles.button} onClick={() => navigate.push('/Product')}>Product</button>
              <button style={styles.button} onClick={() => navigate.push('/order')}>Order</button>
              <button style={styles.button} onClick={() => navigate.push('/shipping')}>Shipping</button>
              <Link  style={{ textDecoration: 'none' }}>
                <button style={styles.button}>Warehouse</button>
              </Link>
              
            </div>
          </div>

          {weatherData ? (
            <div style={styles.weatherInfo}>
              <h2>{weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp.toFixed(2)}Â°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          ) : (
            <p>{weatherApiError && !weatherData ? 'Weather API is not available' : 'Weather API is loading...'}</p>
          )}
          <button onClick={handleToggleAutoUpdateWeather}>
            {autoUpdateWeather ? 'Disable Auto Update Weather' : 'Enable Auto Update Weather'}
          </button>
          <button onClick={handleUpdateWeather}>Update Weather Data</button>
          {dateTime !== null && ( // Render date and time only when dateTime is not null
            <div style={styles.weatherInfo}>
              <p>Date and Time: {dateTime.toString()}</p>
            </div>
          )}
          {dateTime === null && (
            <p>{dateTimeApiError ? 'Date & Time API is not available' : 'Date & Time API is loading...'}</p>
          )}
          <button onClick={handleToggleAutoUpdateDateTime}>
            {autoUpdateDateTime ? 'Disable Auto Update Date and Time' : 'Enable Auto Update Date and Time'}
          </button>
          <button onClick={handleUpdateDateTime}>Update Date and Time</button>
        </header>
      </div>
    </Router>
  );
}

export default Weather;
