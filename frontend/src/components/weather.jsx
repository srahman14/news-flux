import React, { useState } from "react";
import axios from "axios";
import "./weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !country) {
      setErrorMessage("Please enter both city and country.");
      setWeatherData(null);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/weather?city=${city}&country=${country}`
      );

      if (response.data.error) {
        setErrorMessage(response.data.error);
        setWeatherData(null);
      } else {
        setWeatherData(response.data);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch weather data.");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-page rounded-xl">
      <div className="weather-card">
        <h1 className="weather-title">Weather Forecast</h1>

        <form className="weather-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Country (e.g., GB)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Get Weather
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {weatherData && (
          <>
            <h2 className="location">
              {weatherData.city}, {weatherData.country}
            </h2>
            <ul className="forecast-list">
              {Object.entries(weatherData.forecasts).map(([date, forecast]) => (
                <li key={date} className="forecast-item">
                  <span className="forecast-date">{date}</span>
                  <span>
                    {forecast.temperature}°C, {forecast.weather}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;