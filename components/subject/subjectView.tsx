"use client";

import Course from "@/utils/supabase/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SubjectView({
  subjects,
}: {
  subjects: Course["subjects"][number];
}) {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto">
      <div className="relative h-64 bg-cover bg-center">
        <button
          onClick={handleBack}
          type="button"
          title="back"
          className="z-50 absolute left-4 top-4 text-white rounded-md shadow-md hover:text-gray-100 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <Image
          src={subjects.imageUrl}
          alt={subjects.title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl shadow-xl">
          <h1 className="text-3xl font-semibold text-white text-center">
            {subjects.title}
          </h1>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-2xl text-gray-800 leading-6 mb-4">
          Description
        </h2>
        <p className="text-gray-700 text-lg mb-6">{subjects.description}</p>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
          <h3 className="font-semibold text-lg text-gray-800">
            Course Outline
          </h3>
          <ul className="list-disc pl-4">
            {subjects.contents.map((content, index) => (
              <li key={index} className="text-gray-700">
                {content.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Number of Modules
            </h3>
            <p className="text-gray-700">4</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Hours to Complete
            </h3>
            <p className="text-gray-700">100 hours</p>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-8">
        <div className="flex flex-wrap -mx-2"></div>
      </div>
    </div>
  );
}
