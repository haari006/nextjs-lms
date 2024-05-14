"use client";

import Link from "next/link";
import React from "react";

interface Course {
  id: number;
  tag: string;
  title: string;
  description: string;
  image_url: string;
}

export default function BrowseCoursesCards({ courses }: { courses: Course[] }) {
  const [showAllCourses, setShowAllCourses] = React.useState(false);

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-4 flex justify-between items-center">
        <h2 className="text-gray-800 text-2xl font-bold">Browse Courses</h2>
        {courses.length < 3 && (
          <button
            onClick={toggleShowAllCourses}
            className="text-blue-500 font-semibold cursor-pointer focus:outline-none"
          >
            {showAllCourses ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col items-center">
            <Link href="/courses/[courseID]" as={`/courses/${course.id}`}>
              <div className="relative w-full">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-md transition-opacity duration-300 ease-in-out hover:opacity-75"
                />
                <div className="mt-2 text-gray-700 font-semibold">
                  <div className="text-xs text-gray-500 mb-1 text-red-500 uppercase">
                    {course.tag}
                  </div>
                  <h2>{course.title}</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
