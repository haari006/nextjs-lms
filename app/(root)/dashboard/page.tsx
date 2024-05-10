import DashboardChart from "@/components/dashboard/chart";
import CourseOverview from "@/components/dashboard/courseOverview";
import MiniCards from "@/components/dashboard/minicards";


export default async function Page() {
  return (
    <div className="min-h-screen text-white">
      <div className="animate-in max-w-7xl mx-auto">
        <MiniCards />
        <CourseOverview />
        <DashboardChart />
      </div>
    </div>
  );
}
