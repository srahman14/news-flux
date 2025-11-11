import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Repeat } from "lucide-react"; // Correct icons

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
        `http://127.0.0.1:5000/api/currency/latest?base=${base}&target=${target}`
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

  // Fetch initial conversion on page load
  useEffect(() => {
    handleExchange();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-8">
      <h1 className="text-white text-3xl font-bold mb-6 flex items-center gap-2">
        <ArrowRight /> Currency Exchange
      </h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col gap-4 w-full max-w-lg">
        {/* Inputs row */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Base currency */}
          <div className="flex flex-col flex-1">
            <label className="text-white font-semibold mb-1">Base Currency</label>
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

          {/* Target currency */}
          <div className="flex flex-col flex-1">
            <label className="text-white font-semibold mb-1">Target Currency</label>
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

          {/* Amount */}
          <div className="flex flex-col flex-1">
            <label className="text-white font-semibold mb-1">Amount</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            />
          </div>
        </div>

        {/* Convert button */}
        <button
          onClick={handleExchange}
          className="flex items-center gap-2 mt-2 justify-center bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition w-full md:w-auto"
        >
          <Repeat /> Convert
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* Converted result */}
      {converted !== null && !error && (
        <p className="text-white font-bold text-xl mt-6">
          {amount} {base} = {converted.toFixed(2)} {target}
        </p>
      )}
    </div>
  );
};

export default CurrencyExchange;