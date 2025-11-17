import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../lib/api";

const CurrencySmall = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/currency/latest`);
        if (response.data.rates) {
          const rateArray = Array.isArray(response.data.rates)
            ? response.data.rates
            : Object.entries(response.data.rates);

          rateArray.sort((a, b) => b[1] - a[1]);
          setRates(rateArray.slice(0, 5)); // top 5 strongest currencies
        }
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4 rounded-xl min-h-[40vh] flex justify-center items-center">
        <p className="text-gray-300 animate-pulse">Loading rates...</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl min-h-[40vh] max-w-sm flex flex-col gap-3">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-white text-xl font-bold truncate">Top Currencies</h2>
      </div>

      {/* Currency list */}
      <ul className="flex flex-col gap-2 overflow-y-auto max-h-[52vh]">
        {rates.map(([currency, value]) => (
          <li
            key={currency}
            className="flex justify-between items-center p-3 rounded-md bg-neutral-800 shadow hover:shadow-lg transition"
          >
            <span className="font-medium text-white truncate">{currency.toUpperCase()}</span>
            <span className="font-semibold text-green-400 truncate" style={{ maxWidth: "50%" }}>
              {value.toFixed(4)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencySmall;