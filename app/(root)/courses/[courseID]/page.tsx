import CourseViewPage from "@/components/courses/courseViewPage";
import {
  fetchContentBySubjectID,
  fetchCourseByID,
  fetchCourses,
  fetchCourseWithSubjectsAndContents,
  fetchSubjectByCourseID,
} from "@/utils/supabase/action";

export default async function Page({
  params,
}: {
  params: { courseID: string };
}) {
  const { courseID } = params;
  const course = await fetchCourseWithSubjectsAndContents(courseID);
  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        {course && <CourseViewPage course={course} />}
      </div>
    </div>
  );
}
