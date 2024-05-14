"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  AcademicCapIcon,
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
  RssIcon,
  Square2StackIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { Course } from "@/utils/supabase/types";
import { BackButton } from "../Button/backButton";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LearnAppBar({
  children,
  course,
}: {
  children: React.ReactNode;
  course: Course;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const current = course.subjects.find((item) => pathname.includes(item.title));
  const navigate = useRouter();

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex grow flex-col gap-y-5 bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <BackButton link={"/dashboard"} />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {course.subjects.map((item, index) => (
                              <li key={index}>
                                <a
                                  href={`/courses/${course.id}/${item.title}`}
                                  className={classNames(
                                    current && pathname.includes(item.title)
                                      ? "bg-white shadow-md text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  {item.title}
                                </a>
                                {/* Render contents of the subject as a list */}
                                <ul className="list-disc pl-4 pl-4">
                                  {item.contents.map(
                                    (content, contentIndex) => (
                                      <li key={contentIndex}>
                                        <a
                                          href={`/learn/${course.id}?subjectIndex=${index}&contentIndex=${contentIndex}&title=${content.title}`}
                                          className="text-gray-500 hover:text-indigo-600"
                                        >
                                          {content.title}
                                        </a>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <BackButton link={"/dashboard"} />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {course.subjects.map((item, index) => (
                      <li key={index}>
                        <a
                          href={`/courses/${course.id}/${item.title}`}
                          className={classNames(
                            current && pathname.includes(item.title)
                              ? "bg-white shadow-md text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          {item.title}
                        </a>
                        {/* Render contents of the subject as a list */}
                        <ul className="list-disc pl-4 pl-4">
                          {item.contents.map((content, contentIndex) => (
                            <li key={contentIndex}>
                              <a
                                href={`/learn/${course.id}?subjectIndex=${index}&contentIndex=${contentIndex}&title=${content.title}`}
                                className="text-gray-500 hover:text-indigo-600"
                              >
                                {content.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-gray-100 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 pl-2 pr-2 rounded-md border border-gray-200 shadow-sm bg-blue-100 text-sm font-semibold leading-6 text-gray-900 hover:underline"
                        aria-hidden="true"
                      >
                        Tom Cook
                      </span>
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <main className="py-5">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
