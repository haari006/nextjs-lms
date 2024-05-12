import CourseViewPage from "@/components/courses/courseViewPage";
import { fetchCourseByID } from "@/utils/supabase/action";

export default async function Page({
  params,
}: {
  params: { courseID: string };
}) {
  const { courseID } = params;
  const course = await fetchCourseByID(courseID);
  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        {course && <CourseViewPage course={course} />}
      </div>
    </div>
  );
}
