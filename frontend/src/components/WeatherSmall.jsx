import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../lib/api";

const WeatherSmall = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchRandomWeather = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/weather/random`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching random weather:", error);
      }
    };

    fetchRandomWeather();
  }, []);

  if (!weather) {
    return (
      <div className="rounded-2xl shadow p-6 w-full h-full flex justify-center items-center">
        <p className="text-neutral-200">Loading weather...</p>
      </div>
    );
  }

  const entries = Object.entries(weather.forecasts || {}).slice(0, 5);
  const [first, ...rest] = entries;

  return (
    <div className=" text-white p-6 rounded-2xl w-full h-full flex flex-col gap-4">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{weather.city}, {weather.country}</h2>
          <p className="text-sm text-neutral-400 mt-1">5-day forecast</p>
        </div>
      </header>

      {first && (
        <div className="bg-linear-to-r from-neutral-800 to-neutral-700 p-4 rounded-xl flex gap-4 items-center">
          <div className="shrink-0">
            {first[1].icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${first[1].icon}@4x.png`}
                alt={first[1].weather}
                className="w-28 h-28 object-contain"
              />
            ) : (
              <div className="w-28 h-28 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
                N/A
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold">{first[1].temperature}°</div>
                <div className="text-sm text-neutral-300 mt-1">{first[1].weather}</div>
              </div>
              <div className="text-right text-sm text-neutral-300">
                <div>{new Date(first[0]).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                {first[1].high && first[1].low && (
                  <div className="mt-1">H: {first[1].high}° • L: {first[1].low}°</div>
                )}
              </div>
            </div>

            {first[1].description && (
              <p className="mt-3 text-sm text-neutral-300 line-clamp-3">{first[1].description}</p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {rest.map(([date, f]) => (
          <div key={date} className="bg-neutral-800 p-3 rounded-lg flex flex-col items-center text-center">
            <div className="text-sm text-neutral-300">{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</div>
            {f.icon ? (
              <img src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`} alt={f.weather} className="w-12 h-12 my-2" />
            ) : (
              <div className="w-12 h-12 bg-neutral-700 rounded-md my-2" />
            )}
            <div className="font-medium text-lg">{f.temperature}°</div>
            <div className="text-xs text-neutral-400 mt-1">{f.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSmall;