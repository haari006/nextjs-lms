"use client";

import { CourseProgress, Enrollment } from "@/utils/supabase/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function DashboardChart({
  enrollment,
}: {
  enrollment: Enrollment | null;
}) {
  const [courseData, setCourseData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        if (enrollment) {
          const data = processEnrollmentData(enrollment);
          setCourseData(data);
          setLoading(false); // Set loading to false after data is fetched
        } else {
          setCourseData([]);
          setLoading(false); // Set loading to false if enrollment is null
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false); // Set loading to false on error
      }
    }

    fetchCourses();
  }, [enrollment]);

  useEffect(() => {
    if (!loading && courseData.length > 0) {
      // Create the chart when course data is available
      const ctx = document.getElementById(
        "dashboard-chart"
      ) as HTMLCanvasElement;
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: courseData.map((data) => data.year.toString()), // Convert year to string
            datasets: [
              {
                label: "Number of Enrollments",
                data: courseData.map((data) => data.numEnrollments),
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
              {
                label: "Average Progress",
                data: courseData.map((data) => parseFloat(data.avgProgress)), // Convert avgProgress to number
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "category",
                labels: courseData.map((data) => data.year.toString()), // Convert year to string
              },
            },
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          },
        });
      }
    }
  }, [courseData, loading]);

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
      <h2 className="text-xl text-gray-800 font-semibold mb-4">
        Course Enrollments Over Time
      </h2>
      <canvas id="dashboard-chart" />
    </div>
  );
}

const processEnrollmentData = (enrollment: Enrollment | null): any[] => {
  if (!enrollment) {
    return [];
  }

  const enrollmentData: any[] = [];

  // Assuming we want to track data for the last 5 years
  const currentYear = new Date().getFullYear();
  for (let year = currentYear - 4; year <= currentYear; year++) {
    const yearEnrollments = enrollment.courses.filter((course) => {
      const enrollmentYear = course.progress.created_at
        ? new Date("2024-05-13T20:00:00Z").getFullYear()
        : null;
      return enrollmentYear === year;
    });

    const numEnrollments = yearEnrollments.length;
    const totalProgress = yearEnrollments.reduce((sum, course) => {
      // Calculate the progress for each course enrollment
      const progress = calculateCourseProgress(course.progress);
      return sum + progress;
    }, 0);
    const avgProgress = totalProgress / numEnrollments || 0;

    enrollmentData.push({
      year,
      numEnrollments,
      avgProgress,
    });
  }

  return enrollmentData;
};

const calculateCourseProgress = (progress: CourseProgress | null): number => {
  if (!progress) {
    return 0; // Return 0 progress if progress data is null or undefined
  }

  const totalContents = progress.subjects.reduce(
    (total, subject) => total + subject.contents.length,
    0
  );
  const completedContents = progress.subjects.reduce(
    (total, subject) =>
      total + subject.contents.filter((content) => content.finished).length,
    0
  );

  return (completedContents / totalContents) * 100;
};
