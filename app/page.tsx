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
            src="/images/RK.png"
            width={100}
            height={50}
            alt="Headtech Logo"
          />
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-6xl w-full p-3">
          <div className="flex flex-col items-center bg-gray-900 text-white">
            <div className="flex gap-20 justify-center items-center">
              <Image
                src="/images/RK.png"
                width={100}
                height={100}
                alt="LMS Logo"
                className="mt-5"
              />
            </div>
            <h1 className="sr-only">Learning Management System</h1>
            <p className="text-3xl lg:text-4xl leading-tight mx-auto max-w-xl text-center">
              <span className="font-bold">Learning Management System </span>{" "}
              <br />
              <span className="text-blue-400 text-sm leading-2">
                Empowering education through technology.
              </span>
            </p>
            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            {user ? (
              <Link href="/dashboard" className="flex justify-center">
                <button className="flex justify-center bg-white hover:shadow-indigo-500 shadow-md text-gray-800 font-semibold leading-5 py-2 px-4 rounded">
                  Let's Learn
                </button>
              </Link>
            ) : (
              <Link href="/login" className="flex justify-center">
                <button className="flex justify-center bg-white hover:shadow-indigo-500 shadow-md text-gray-800 font-semibold leading-5 py-2 px-4 rounded">
                  Join Us
                </button>
              </Link>
            )}
          </div>
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
            RK Industries
          </Link>
        </p>
      </footer>
    </div>
  );
}
