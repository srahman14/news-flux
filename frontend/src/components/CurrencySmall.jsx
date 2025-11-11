import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CurrencySmall = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/currency/latest"
        );

        if (response.data.rates) {
          const rateArray = Array.isArray(response.data.rates)
            ? response.data.rates
            : Object.entries(response.data.rates);
          
          // Sort by highest value
          rateArray.sort((a, b) => b[1] - a[1]);
          setRates(rateArray.slice(0, 5)); // show top 5 strongest currencies
        }
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl shadow-md min-h-[40vh] flex justify-center items-center">
        <p className="text-gray-600 animate-pulse">Loading rates...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-md min-h-[40vh] max-w-sm">
      {/* Header + button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Top Currencies</h2>
        <button
          onClick={() => navigate("/currency")}
          className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
        >
          Exchange <ArrowRight size={16} />
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {rates.map(([currency, value]) => (
          <li
            key={currency}
            className="flex justify-between items-center p-3 rounded-lg bg-white shadow hover:shadow-lg transition"
          >
            <span className="font-medium text-gray-800">{currency}</span>
            <span className="font-semibold text-green-600">{value.toFixed(4)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencySmall;