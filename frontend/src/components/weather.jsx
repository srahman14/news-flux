import React, { useState } from "react";
import axios from "axios";

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
    <div className="bg-black min-h-screen flex justify-center items-start p-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        {/* Title */}
        <h1 className="text-black text-2xl font-bold text-center mb-6">
          Weather Forecast
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 rounded-md border border-gray-300 text-black"
          />
          <input
            type="text"
            placeholder="Country (e.g., US)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="p-2 rounded-md border border-gray-300 text-black"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition mt-2"
          >
            Get Weather
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        {/* Weather Forecast */}
        {weatherData && (
          <>
            <h2 className="text-black font-bold text-xl text-center mb-4">
              {weatherData.city}, {weatherData.country}
            </h2>
            <ul className="space-y-2">
              {Object.entries(weatherData.forecasts).map(([date, f]) => (
                <li
                  key={date}
                  className="bg-white p-3 rounded-lg flex justify-between items-center shadow-sm"
                >
                  <span className="text-black font-medium">{date}</span>
                  <span className="flex items-center gap-2 text-black">
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
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;