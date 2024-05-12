import SubjectView from "@/components/subject/subjectView";
import { fetchSubjectByIndex } from "@/utils/supabase/action";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { id: number };
  params: { courseID: string };
}) {
  const { id } = searchParams;
  const { courseID } = params;
  const course = await fetchSubjectByIndex(courseID, id);
  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        <SubjectView subjects={course} />
      </div>
    </div>
  );
}
