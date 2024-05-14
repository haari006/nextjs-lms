import DashboardChart from "@/components/dashboard/chart";
import CourseOverview from "@/components/dashboard/courseOverview";
import MiniCards from "@/components/dashboard/minicards";
import { getCourseData, getEnrollmentData } from "@/utils/supabase/action";

export default async function Page() {
  const enrollment = await getEnrollmentData();
  const courseData = await getCourseData(enrollment);
  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        <MiniCards enrollment={enrollment} />
        <CourseOverview coursesData={courseData} />
        <DashboardChart enrollment={enrollment} />
      </div>
    </div>
  );
}
