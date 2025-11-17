import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Repeat, DollarSign } from "lucide-react";
import { API_BASE_URL } from "../lib/api";

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY"];

const CurrencyExchange = () => {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState("");

  const handleExchange = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/currency/latest?base=${base}&target=${target}`
      );
      if (response.data.error) {
        setError(response.data.error);
        setConverted(null);
      } else {
        setConverted(response.data.target_rate * amount);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch currency data.");
      setConverted(null);
    }
  };

  useEffect(() => {
    handleExchange();
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center items-start p-8">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-lg hover:scale-105 transform transition duration-300">
        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-6 flex items-center gap-2">
          <DollarSign size={28} /> Currency Exchange
        </h1>

        {/* Inputs */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex flex-col flex-1">
            <label className="text-gray-300 mb-1">Base Currency</label>
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-gray-300 mb-1">Target Currency</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-gray-300 mb-1">Amount</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleExchange}
          className="w-full md:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
        >
          <Repeat /> Convert
        </button>

        {/* Error */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Result */}
        {converted !== null && !error && (
          <p className="text-green-400 font-bold text-xl mt-6 text-center">
            {amount} {base} = {converted.toFixed(2)} {target}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyExchange;