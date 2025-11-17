import React, { useState } from "react";
import axios from "axios";
import { Sun, Cloud, Droplet } from "lucide-react";
import { API_BASE_URL } from "../lib/api";

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
        `${API_BASE_URL}/api/weather?city=${city}&country=${country}`
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
    <div className="bg-black min-h-screen flex justify-center items-start p-8">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md hover:scale-105 transform transition duration-300">
        <h1 className="text-white text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Sun size={24} /> Weather Forecast
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          />
          <input
            type="text"
            placeholder="Country (e.g., US)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition mt-2 font-semibold"
          >
            Get Weather
          </button>
        </form>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {weatherData && (
          <ul className="space-y-3">
            {Object.entries(weatherData.forecasts).map(([date, f]) => (
              <li
                key={date}
                className="bg-gray-800 p-3 rounded-xl flex justify-between items-center shadow-md hover:bg-gray-700 transition"
              >
                <span className="font-medium">{date}</span>
                <span className="flex items-center gap-2">
                  {f.temperature}°C — {f.weather}
                  {f.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
                      alt={f.weather}
                      className="w-8 h-8"
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Weather;