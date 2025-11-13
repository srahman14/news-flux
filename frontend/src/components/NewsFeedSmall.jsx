import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewspaperIcon } from "lucide-react";

const NewsFeedSmall = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/news");
        setArticles(response.data.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="p-4 rounded-xl min-h-[40vh] flex justify-center items-center">
        <p className="text-gray-300 animate-pulse">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl min-h-[40vh] flex flex-col gap-4">
    

      {/* Articles */}
      <div className="flex flex-col gap-3">
        {articles.map((article, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-neutral-800 p-3 rounded-lg shadow hover:shadow-md transition"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-16 h-16 object-cover rounded-md shrink-0"
              />
            )}
            <div className="flex-1 flex flex-col">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {article.title}
              </h3>
              {article.description && (
                <p className="text-gray-300 text-xs line-clamp-2">
                  {article.description}
                </p>
              )}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-xs font-medium hover:underline mt-3"
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