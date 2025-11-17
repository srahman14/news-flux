import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { API_BASE_URL } from "../lib/api";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TIMEFRAMES = [7, 30, 90, 180, 365];

const Crypto = () => {
  const [topCryptos, setTopCryptos] = useState([]);
  const [selectedCryptoId, setSelectedCryptoId] = useState(null);
  const [timeframe, setTimeframe] = useState(30);
  const [history, setHistory] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  // Fetch top 5 cryptos from backend
  const fetchTopCryptos = async () => {
    setLoadingTop(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/crypto-small`);
      if (res.data && res.data.length > 0) {
        setTopCryptos(res.data);
        setSelectedCryptoId(res.data[0].id); // select first by default
      }
      setError("");
    } catch {
      setError("Failed to fetch top cryptocurrencies.");
    } finally {
      setLoadingTop(false);
    }
  };

  // Fetch historical data for selected crypto
  const fetchHistory = async (cryptoId) => {
    if (!cryptoId) return;
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/crypto-history`, {
        params: { crypto: cryptoId, days: timeframe }
      });
      setHistory(res.data?.prices || []);
      setError("");
    } catch {
      setHistory([]);
      setError("Failed to fetch historical data.");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchTopCryptos();
  }, []);

  useEffect(() => {
    if (selectedCryptoId) fetchHistory(selectedCryptoId);
  }, [selectedCryptoId, timeframe]);

  const selectedCrypto = topCryptos.find((c) => c.id === selectedCryptoId);

  const chartData = {
    labels: history.map((p) => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: selectedCrypto ? `${selectedCrypto.name} Price (USD)` : "",
        data: history.map((p) => p[1]),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        tension: 0.3,
        pointRadius: 2
      }
    ]
  };

  return (
    <div className="bg-black min-h-screen p-8 text-white flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Top 5 Cryptos</h1>

      {error && <p className="text-red-500">{error}</p>}

      {(loadingTop || !selectedCrypto) ? (
        <p>Loading cryptocurrencies...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
          {/* Crypto selection */}
          <div className="flex flex-col gap-3 w-full md:w-1/4">
            {topCryptos.map((coin) => (
              <button
                key={coin.id}
                onClick={() => setSelectedCryptoId(coin.id)}
                className={`p-3 rounded-md w-full text-left hover:bg-gray-700 transition truncate ${
                  selectedCryptoId === coin.id ? "bg-gray-800 font-bold" : "bg-gray-900"
                }`}
              >
                <span className="truncate">{coin.name}</span>
                <span className="float-right text-green-400 font-semibold">
                  ${coin.current_price?.toLocaleString()}
                </span>
              </button>
            ))}

            {/* Timeframe selector */}
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              className="bg-gray-800 p-2 rounded-md mt-4"
            >
              {TIMEFRAMES.map((t) => (
                <option key={t} value={t}>{t} days</option>
              ))}
            </select>
          </div>

          {/* Chart */}
          <div className="flex-1 bg-gray-800 p-4 rounded-xl shadow-md min-h-[400px]">
            {loadingHistory ? (
              <p className="text-gray-300 text-center mt-20">Loading chart...</p>
            ) : history.length > 0 ? (
              <Line data={chartData} />
            ) : (
              <p className="text-gray-300 text-center mt-20">No historical data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Crypto;