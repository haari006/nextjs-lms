"use server";

import { Course, Enrollment } from "./types";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";

export async function fetchUserData() {
  const supabase = createClient();
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCourses() {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCourseByID(id: string): Promise<Course> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchSubjectByIndex(
  courseID: string,
  index: number
): Promise<Course["subjects"][number]> {
  const supabase = createClient();
  try {
    // Fetch the course by its ID
    const course = await fetchCourseByID(courseID);

    // Get the subject based on the index
    const subject = course.subjects[index];

    return subject;
  } catch (error: any) {
    throw new Error("Failed to fetch subject: " + error.message);
  }
}

export async function fetchContentByIndex(
  courseID: string,
  subjectIndex: number,
  index: number
): Promise<Course["subjects"][number]["contents"][number]> {
  const supabase = createClient();
  try {
    // Fetch the course by its ID
    const course = await fetchCourseByID(courseID);

    // Get the subject based on the index
    const subject = course.subjects[subjectIndex].contents[index];

    return subject;
  } catch (error: any) {
    throw new Error("Failed to fetch subject: " + error.message);
  }
}

export async function getEnrollmentData() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not logged in");
    }
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function enrollCourse(course: Course) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  try {
    // Check if the user exists in the enrollments table
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // If the user doesn't exist in the enrollments table, create a new record
    if (!data) {
      const { error: createError } = await supabase
        .from("enrollments")
        .insert([{ user_id: user?.id, courses: [] }]);

      if (createError) {
        throw createError;
      }
    }

    const progress = {
      subjects: course.subjects.map((subject, subjectIndex) => ({
        id: subjectIndex,
        name: subject.title,
        contents: subject.contents.map((content, contentIndex) => ({
          id: contentIndex,
          title: content.title,
          finished: false,
          quizMark: null,
        })),
      })),
    };

    const newCourseEnrollment = {
      course_id: course.id.toString(),
      progress,
    };

    const updatedData = {
      courses: data?.courses
        ? [...data.courses, newCourseEnrollment]
        : [newCourseEnrollment],
    };

    const { error: updateError } = await supabase
      .from("enrollments")
      .update(updatedData)
      .eq("user_id", user?.id);

    if (updateError) {
      throw updateError;
    }
    revalidatePath("/courses");
    console.log("Enrolled Succesfully");
  } catch (error) {
    console.error("Error enrolling course:", error);
  }
}

export async function isEnrolledInCourse(courseId: string): Promise<boolean> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  try {
    if (!user) {
      throw new Error("User not logged in");
    }
    const { data, error } = await supabase
      .from("enrollments")
      .select("courses")
      .eq("user_id", user.id)
      .single();

    if (error) {
      throw error;
    }

    // Check if the user has an enrollment record
    if (!data) {
      return false;
    }

    // Check if the user is enrolled in the specified course
    const isEnrolled = data.courses.some(
      (enrollment: any) => enrollment.course_id === courseId
    );
    revalidatePath("/courses");
    return isEnrolled;
  } catch (error) {
    console.error("Error checking course enrollment:", error);
    return false;
  }
}

interface CourseData {
  courseTitle: string;
  progress: number;
  id: string;
}

export async function getCourseData(
  enrollment: Enrollment
): Promise<CourseData[]> {
  const courseData: CourseData[] = [];

  for (const course of enrollment.courses) {
    const totalContents = course.progress.subjects.reduce(
      (acc, subject) => acc + subject.contents.length,
      0
    );
    const finishedContents = course.progress.subjects.reduce(
      (acc, subject) =>
        acc + subject.contents.filter((content) => content.finished).length,
      0
    );
    const progress = (finishedContents / totalContents) * 100;

    // Find the course title from the subjects array
    const courseTitle = await fetchCourseByID(course.course_id.toString());

    courseData.push({
      id: course.course_id.toString(),
      courseTitle: courseTitle.title || "Unknown Course",
      progress,
    });
  }

  return courseData;
}

export async function findSubjectAndContents(
  course: Course,
  subjectTitle: string
) {
  const foundSubject = course.subjects.find(
    (subject) => subject.title === subjectTitle
  );

  if (foundSubject) {
    return {
      subject: foundSubject,
      contents: foundSubject.contents,
    };
  }

  return {
    subject: undefined,
    contents: undefined,
  };
}
