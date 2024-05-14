import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <nav className="flex justify-center border-b border-gray-600 h-16 bg-gray-900 text-white">
        <div className="max-w-6xl w-full flex justify-between items-center p-3 text-sm">
          <Image
            src="/images/headtech.png"
            width={100}
            height={50}
            alt="Headtech Logo"
          />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-6xl w-full p-3">
          {user && <Header user={user} />}
        </div>
      </div>

      <footer className="border-t border-gray-600 bg-gray-900 text-center text-white p-8">
        <p>
          Powered by{" "}
          <Link
            href="https://headtech1.demowebsg06.com/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Headtech
          </Link>
        </p>
      </footer>
    </div>
  );
}
