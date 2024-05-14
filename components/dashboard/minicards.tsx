import { Enrollment } from "@/utils/supabase/types";
import {
  RectangleStackIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function MiniCards({ enrollment }: { enrollment: Enrollment }) {
  const numberOfEnrollments = enrollment.courses.length;
  return (
    <div className="flex flex-wrap justify-between">
      {/* Row 1 */}
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        {/* Courses Enrolled Card */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-full md:w-64">
          <div className="p-3 rounded-full mr-4">
            <RectangleStackIcon className="text-indigo-500 h-5 w-5" />
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold">Enrolled</h3>
            <p className="text-gray-600">{numberOfEnrollments || 0}</p>
          </div>
        </div>
        {/* Time Spent Card */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-full md:w-64">
          <div className="p-3 rounded-full mr-4">
            <ClockIcon className="text-green-500 h-5 w-5" />
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold">Time Spent</h3>
            <p className="text-gray-600">Less Than 1 hour</p>
          </div>
        </div>
        {/* Progress Card */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-full md:w-64">
          <div className="p-3 rounded-full mr-4">
            <ChartBarIcon className="text-yellow-500 h-5 w-5" />
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold">Progress</h3>
            <p className="text-gray-600">Not Available</p>
          </div>
        </div>
        {/* Rating Card */}
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-full md:w-64">
          <div className="p-3 rounded-full mr-4">
            <StarIcon className="text-red-500 h-5 w-5" />
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold">Rating</h3>
            <p className="text-gray-600">Calculating..</p>
          </div>
        </div>
      </div>
      {/* Row 2 */}
      {/* Add more cards here if needed */}
    </div>
  );
}
