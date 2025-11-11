import React from "react";
import WeatherSmall from "./components/WeatherSmall";
import NewsFeedSmall from "./components/NewsFeedSmall";
// If you ever want the full feed:
// import NewsFeed from "./components/NewsFeed";

const App = () => {
  return (
    <div className="min-h-screen bg-black overflow-y-auto">
      <div className="p-8 flex flex-col md:flex-row gap-8">

        {/* Small weather preview */}
        <div className="flex-1 max-w-sm">
          <WeatherSmall />
        </div>

        {/* Small news feed preview */}
        <div className="flex-1 max-w-md">
          <NewsFeedSmall />
        </div>

        {/* Full news feed (optional) */}
        {/* <NewsFeed /> */}
      </div>
    </div>
  );
};

export default App;