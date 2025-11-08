import React from "react";
import NewsFeed from "./components/NewsFeed";
import NewsFeedSmall from "./components/NewsFeedSmall";

const App = () => {
  return (
    <div className="min-h-screen bg-black overflow-y-hidden">
      <div className="p-8">
        <NewsFeedSmall />
      </div>
      {/* <NewsFeed /> */}
    </div>
  );
};

export default App;
