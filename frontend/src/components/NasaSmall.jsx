import { useEffect, useState } from "react";
import { InfoIcon } from "lucide-react";
import axios from "axios";

const Nasasmall = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/nasa-small")
      .then((res) => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch NASA data");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-white">Loading NASA APOD...</p>;
  if (error) return <p className="text-white">{error}</p>;

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-lg w-full h-full flex flex-col gap-4 transition-transform transform hover:-translate-y-1">
      <h2 className="text-xs uppercase tracking-wider text-neutral-400">
        Astronomy Picture of the Day
      </h2>

      <h3 className="mt-1 text-lg font-semibold text-white text-center">
        {apod.title}
      </h3>

      <div className="w-full">
        {apod.media_type === "image" ? (
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-64 sm:h-72 rounded-lg object-cover mb-3"
          />
        ) : (
          <iframe
            title={apod.title}
            src={apod.url}
            frameBorder="0"
            allowFullScreen
            className="w-full h-64 sm:h-72 rounded-lg mb-3"
          ></iframe>
        )}
      </div>

      <div className="flex items-start gap-3">
        <p
          className={`text-sm text-neutral-300 leading-relaxed transition-all ${
            showFullText ? "max-h-60" : "max-h-20 overflow-hidden"
          }`}
        >
          {showFullText
            ? apod.explanation
            : apod.explanation.substring(0, 120) + "..."}
        </p>

        <button
          onClick={() => setShowFullText((p) => !p)}
          aria-expanded={showFullText}
          aria-label={showFullText ? "Hide details" : "Show details"}
          className="ml-auto p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
        >
          <InfoIcon className="w-5 h-5" />
        </button>
      </div>

      <a
        href="/nasa"
        className="mt-auto inline-block text-indigo-400 hover:text-indigo-300 font-medium"
      >
        See more →
      </a>
    </div>
  );
};

export default Nasasmall;