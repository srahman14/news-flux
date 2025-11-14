// frontend/src/components/CryptoSmall.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";

const CryptoSmall = () => {
  const [topCryptos, setTopCryptos] = useState([]);
  const [error, setError] = useState("");

  const fetchTopCryptos = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 5,
            page: 1,
          },
        }
      );
      setTopCryptos(res.data);
      setError("");
    } catch (error) {
      console.error("Error: ", error);
      setError("Failed to fetch crypto data.");
    }
  };

  useEffect(() => {
    fetchTopCryptos();
  }, []);

  return (
    <div className="rounded-xl p-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-3 text-white">Top 5 Cryptos</h2>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {topCryptos.map((coin) => (
          <li
            key={coin.id}
            className="flex justify-between items-center p-3 bg-neutral-800 rounded-md hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-white font-medium truncate">
                {coin.name}
              </span>
            </div>
            <span className="text-green-400 font-semibold ml-2 whitespace-nowrap">
              ${coin.current_price.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoSmall;
