"use client";

import getProgressColor from "@/utils/supabase/getProgressColor";
import { Enrollment } from "@/utils/supabase/types";
import Link from "next/link";
import React, { useState } from "react";

export default function CourseOverview({
  coursesData,
}: {
  coursesData: any[];
}) {
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
        {visibleCourses.map((course, index) => (
        <Link href={`/learn/${course.id}?subjectIndex=0&contentIndex=0`} key={index}>
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md text-gray-800 hover:shadow-lg hover:shadow-indigo-500"
          >
            <h3 className="text-lg font-semibold mb-2">{course.courseTitle}</h3>
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
                  stroke={getProgressColor(course.progress)}
                  strokeWidth="8"
                  strokeDasharray="251.2 251.2"
                  strokeDashoffset={(100 - course.progress) * 2.512}
                />
              </svg>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
