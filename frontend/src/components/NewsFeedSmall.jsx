import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
const NewsFeedSmall = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/news")
        console.log(response)
        setArticles(response.data.slice(0, 5))
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news: ", error)      
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  // Skeleton loader
  if (loading) {
    return (
      <div className="min-w-[40vh] max-h-[60vh] bg-gray-50 p-4 rounded-xl shadow-md">
        <header className="mb-4">
          <h2 className="text-xl font-bold animate-pulse bg-gray-300 h-6 w-32 rounded"></h2>
        </header>

        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white p-3 rounded-lg shadow animate-pulse"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[40vh] max-h-[60vh] p-4 rounded-xl shadow-md max-w-[40vh] overflow-auto ">
      <header className="mb-4">
        <h2 className="text-xl font-bold">Top Headlines</h2>
      </header>

      <div className="flex flex-col gap-4">
        {articles.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white p-3 rounded-lg shadow hover:shadow-md transition"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md shrink-0"
              />
            )}
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600 text-xs mb-2 line-clamp-3">
                {item.description}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs font-medium hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeedSmall;
