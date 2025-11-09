import React from "react";
import Weather from "./components/weather";
import NewsFeed from "./components/NewsFeed";
import NewsFeedSmall from "./components/NewsFeedSmall";

const App = () => {
  return (
    <div className="min-h-screen bg-black overflow-y-hidden">
      <div className="p-8 flex flex-col gap-8">
        {/* Weather component */}
        <Weather />

        {/* Small news feed */}
        <NewsFeedSmall />

        {/* Full news feed (optional) */}
        {/* <NewsFeed /> */}
      </div>
    </div>
  );
};

export default App;