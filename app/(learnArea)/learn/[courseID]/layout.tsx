import LearnAppBar from "@/components/sidebar/learnAppSidebar";
import AppBar from "@/components/sidebar/sidebar";
import { fetchCourseByID } from "@/utils/supabase/action";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LearnAreaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseID: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { courseID } = params;
  const course = await fetchCourseByID(courseID);

  return (
    <>
      <LearnAppBar course={course}>{children}</LearnAppBar>
    </>
  );
}
