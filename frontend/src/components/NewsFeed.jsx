import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/news")
        setArticles(response.data)
      } catch (error) {
        console.error("Error fetching news: ", error)      
      }
    };
    
    fetchNews();
  }, []);

  return (
    <div className="bg-black">
      <header>
        <h1>Top Headlines</h1>
      </header>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={item.image_url}
              alt={item.title}
              className="rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
