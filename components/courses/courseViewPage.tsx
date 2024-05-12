"use client";

import Course from "@/utils/supabase/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseViewPage = ({ course }: { course: Course }) => {
  const handleEnroll = () => {
    console.log(`Enrolling in course: ${course.title}`);
  };

  return (
    <div className="container mx-auto">
      {/* Course Title */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {course.title}
        </h1>

        {/* Enroll Button (Top Right) */}
        <button
          onClick={handleEnroll}
          className="bg-white text-green-500 font-semibold px-4 border-2 border-green-500 rounded-md shadow-md hover:scale-105 duration-300 ease-in-out transition-all ease-in-out"
        >
          Enroll
        </button>
      </div>

      {/* Course Description */}
      <p className="text-gray-700 text-lg mb-6">{course.description}</p>

      {/* Subjects */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subjects</h2>
        <div className="flex flex-wrap -mx-2">
          {course.subjects.map((subject, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
            >
              <div className="relative">
                <Link href={`${course.id}/subject?name=${subject.title}&id=${index}`}>
                  <Image
                    src={subject.imageUrl}
                    alt={subject.title}
                    className="w-full h-40 object-cover rounded-md transition-opacity duration-300 ease-in-out hover:opacity-75"
                    width={300}
                    height={169}
                    loading="lazy"
                  />
                </Link>
                <div className="mt-2 text-gray-700 font-semibold">
                  <h2>{subject.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
