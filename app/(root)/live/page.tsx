import AssignmentsPage from "@/components/assignment/assignmentPage";
import LiveStreamPage from "@/components/livestream/livestream";

export default async function Page() {

  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        <LiveStreamPage />
      </div>
    </div>
  );
}
