"use client";

import Link from "next/link";
import React from "react";

interface Course {
  id: number;
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
      <div className="flex justify-between w-full mb-4">
        <h2 className="text-gray-800 text-2xl font-bold">Browse Courses</h2>
        {courses.length < 3 && (
          <button
            onClick={toggleShowAllCourses}
            className="flex items-center text-blue-500 font-semibold cursor-pointer focus:outline-none"
          >
            {showAllCourses ? "Show Less" : "View All"}
          </button>
        )}
      </div>
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Link href="/courses/[courseID]" as={`/courses/${course.id}`}>
            <div className="relative">
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md transition-opacity duration-300 ease-in-out hover:opacity-75"
              />
              <div className="mt-2 text-gray-700 font-semibold">
                <div className="text-xs text-gray-500 mb-1 text-red-500 uppercase">
                  Sports
                </div>
                <h2>{course.title}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
