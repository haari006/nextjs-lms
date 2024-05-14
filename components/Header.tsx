import Link from "next/link";
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";
import Image from "next/image";
import { User } from "@supabase/supabase-js";

export default function Header({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center bg-gray-900 text-white">
      <div className="flex gap-20 justify-center items-center">
        <Image
          src="/images/headtech.png"
          width={100}
          height={100}
          alt="LMS Logo"
          className="mt-5"
        />
      </div>
      <h1 className="sr-only">Learning Management System</h1>
      <p className="text-3xl lg:text-4xl leading-tight mx-auto max-w-xl text-center">
        Headtech <br />{" "}
        <span className="font-bold">Learning Management System </span> <br />
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
  );
}
