import React from 'react';

const LiveStreamPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Live Streaming</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">No Live Stream at the Moment</h2>
        <p className="text-gray-700">There are currently no live streams available. Please check back later.</p>
      </div>
    </div>
  );
};

export default LiveStreamPage;
