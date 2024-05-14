"use client";

import React, { useState } from 'react';

const LearningPage = ({ subject }: { subject: any }) => {
  const [completed, setCompleted] = useState(false);

  const handleMarkAsCompleted = () => {
    setCompleted(true);
  };

  return (
    <div className="text-gray-800 p-4">
      <h1 className="text-3xl font-semibold mb-4">{subject.title}</h1>
      
      <div className="mb-6">
        <video className="w-full" controls>
          <source src="path/to/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Description</h2>
        <p>{subject.description}</p>
      </div>

      <button
        className={`py-2 px-4 rounded-md text-white font-semibold focus:outline-none ${
          completed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
        }`}
        onClick={handleMarkAsCompleted}
        disabled={completed}
      >
        {completed ? 'Completed' : 'Mark as Completed'}
      </button>
    </div>
  );
};

export default LearningPage;
