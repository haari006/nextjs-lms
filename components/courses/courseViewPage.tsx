"use client";

import Course from '@/utils/supabase/types';
import React from 'react';

const CourseViewPage = ({ course }:{course:Course}) => {
  const handleEnroll = () => {
    // Logic to handle course enrollment
    console.log(`Enrolling in course: ${course.title}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">{course.title}</h1>

      {/* Enroll Button (Top Right) */}
      <button
        onClick={handleEnroll}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md absolute top-4 right-4"
      >
        Enroll
      </button>

      {/* Course Description */}
      <p className="text-gray-700 text-lg mb-6">{course.description}</p>

      {/* Subjects */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subjects</h2>
        <ul className="list-disc list-inside text-gray-700">
          {course.subjects.map((subject) => (
            <li key={subject.id}>{subject.title}</li>
          ))}
        </ul>
      </div>

      {/* Contents */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contents</h2>
        {course.contents.map((content) => (
          <div key={content.id} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{content.title}</h3>
            <p className="text-gray-600">{content.description}</p>
            {/* Add more content details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseViewPage;
