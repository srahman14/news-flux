import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherSmall = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchRandomWeather = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/weather/random");
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching random weather:", error);
      }
    };

    fetchRandomWeather();
  }, []);

  if (!weather) {
    return (
      <div className="bg-black rounded-2xl shadow p-4 w-full max-w-sm flex justify-center items-center">
        <p className="text-white">Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-2xl p-4 shadow w-full max-w-sm">
      <h2 className="text-white text-xl font-bold mb-4">
        {weather.city}, {weather.country}
      </h2>

      <ul className="space-y-2">
        {Object.entries(weather.forecasts).slice(0, 5).map(([date, f]) => (
          <li
            key={date}
            className="bg-white p-3 rounded-lg flex justify-between items-center hover:shadow-md transition duration-300"
          >
            <span className="text-black font-medium">{date}</span>
            <span className="text-black">
              {f.temperature}°C — {f.weather}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherSmall;