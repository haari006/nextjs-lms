import LearningPage from "@/components/learn/LearningPage";
import SubjectView from "@/components/subject/subjectView";
import {
  fetchContentByIndex,
  fetchCourseByID,
  fetchSubjectByIndex,
} from "@/utils/supabase/action";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { subjectIndex: number; contentIndex: number };
  params: { courseID: string };
}) {
  const { subjectIndex, contentIndex } = searchParams;
  const { courseID } = params;
  console.log(courseID, subjectIndex, contentIndex);
  const content = await fetchContentByIndex(
    courseID,
    subjectIndex,
    contentIndex
  );

  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        <LearningPage subject={content} />
      </div>
    </div>
  );
}
