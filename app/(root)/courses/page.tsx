import BrowseCoursesCards from "@/components/courses/browseCourse";
import { fetchCourses } from "@/utils/supabase/action";

export default async function Page() {
  const courses = await fetchCourses();
  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        <BrowseCoursesCards courses={courses} />
      </div>
    </div>
  );
}
