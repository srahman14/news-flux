import React, { useState } from "react";
import axios from "axios";

const CurrencyExchange = () => {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");

  const handleExchange = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/currency/latest?base=${base}&target=${target}`
      );

      if (response.data.error) {
        setError(response.data.error);
        setRate(null);
      } else {
        setRate(response.data.target_rate);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch currency data.");
      setRate(null);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-black text-2xl font-bold mb-6">Currency Exchange</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Base currency (USD)"
          value={base}
          onChange={(e) => setBase(e.target.value.toUpperCase())}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Target currency (EUR)"
          value={target}
          onChange={(e) => setTarget(e.target.value.toUpperCase())}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleExchange}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Get Rate
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {rate && (
        <p className="text-black font-bold text-lg">
          1 {base} = {rate.toFixed(2)} {target}
        </p>
      )}
    </div>
  );
};

export default CurrencyExchange;