"use client";

import { fetchCourseData } from "@/utils/supabase/action";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardChart() {
  const [courseData, setCourseData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await fetchCourseData(); // Your function to fetch course data
        setCourseData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false); // Set loading to false on error
      }
    }

    fetchCourses();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      id: "lms-dashboard-chart",
      toolbar: {
        show: false, // Hide chart toolbar for a cleaner look
      },
    },
    xaxis: {
      categories: courseData.map((course) => course.year), // Assuming year data is available in fetched course data
    },
    dataLabels: {
      enabled: false, // Disable data labels for a cleaner chart
    },
    stroke: {
      curve: "smooth", // Smooth curve for line chart
    },
    tooltip: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: "Enrollments",
      data: courseData.map((course) => course.enrollments), // Assuming enrollments data is available
    },
  ];

  if (loading) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      );
  }

  if (!courseData || courseData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-gray-500 italic">
          No course enrollment data found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">
        Course Enrollments Over Time
      </h2>
      <ApexChart
        type="area"
        options={chartOptions}
        series={chartSeries}
        height={300} 
      />
    </div>
  );
}
