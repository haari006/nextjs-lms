// ResumeCourseComponent.jsx
"use client";

import React, { useState } from "react";

const coursesData = [
  { id: 1, title: "Course 1", progress: 75 },
  { id: 2, title: "Course 2", progress: 40 },
  { id: 3, title: "Course 3", progress: 90 },
  { id: 4, title: "Course 4", progress: 60 },
  { id: 5, title: "Course 5", progress: 20 },
  { id: 6, title: "Course 6", progress: 50 },
  { id: 7, title: "Course 7", progress: 85 },
  // Add more course objects as needed
];

export default function CourseOverview() {
  const [showAllCourses, setShowAllCourses] = useState(false);

  const visibleCourses = showAllCourses ? coursesData : coursesData.slice(0, 3);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <div className="mt-4 text-gray-800 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Course Progress Overview</h2>
        {coursesData.length > 3 && (
          <button
            onClick={toggleShowAllCourses}
            className="flex items-center text-blue-500 font-semibold cursor-pointer focus:outline-none"
          >
            {showAllCourses ? "Show Less" : "View All"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 rounded-lg shadow-md text-gray-800"
          >
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <div className="h-48 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold">{course.progress}%</div>
              </div>
              <svg className="h-48 w-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="30%"
                  fill="transparent"
                  stroke="#655de8"
                  strokeWidth="8"
                  strokeDasharray="251.2 251.2"
                  strokeDashoffset={(100 - course.progress) * 2.512}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
