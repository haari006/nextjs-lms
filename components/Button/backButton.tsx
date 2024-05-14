"use client";

import Link from "next/link";

export const BackButton = ({ link }: { link: string }) => {

  return (
    <div>
      <Link href={link}>
        <button
          type="button"
          title="back"
          className="z-50 absolute left-4 top-4 text-gray-800 p-2 rounded-lg shadow-md hover:shadow-indigo-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};
