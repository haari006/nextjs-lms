import { createClient } from "./client";
import Course from "./types";

const supabase = createClient();

export async function fetchCourseData() {
  const { data, error } = await supabase.from("course").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchUserData() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchEnrollmentByID(id: string) {
  const { data, error } = await supabase.from("enrollment").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCourses() {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCourseByID(id: string) {
  const { data, error } = await supabase.from("courses").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchSubjectByCourseID(id: string) {
  const { data, error } = await supabase.from("subjects").select("*").eq("course_id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchContentBySubjectID(id: string) {
  const { data, error } = await supabase.from("contents").select("*").eq("subject_id", id);
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCourseWithSubjectsAndContents(courseId: string): Promise<Course | null> {
  try {
    // Fetch course data by ID
    const courseData = await fetchCourseByID(courseId) as unknown as Course;
    if (!courseData) {
      return null; // Course not found
    }

    // Fetch subjects related to the course
    const subjectsData = await fetchSubjectByCourseID(courseId);

    // Fetch contents related to the subjects
    const subjectIds = subjectsData.map((subject:any) => subject.id);
    const contentsDataPromises = subjectIds.map((subjectId: string) => fetchContentBySubjectID(subjectId));
    const contentsDataArrays = await Promise.all(contentsDataPromises);

    // Flatten contents data array into a single array of Content objects
    const contentsData = contentsDataArrays.flat();

    // Construct the course object with subjects and contents
    const course: Course = {
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      image_url: courseData.image_url,
      subjects: subjectsData,
      contents: contentsData,
    };

    return course;
  } catch (error) {
    console.error('Error fetching course with subjects and contents:', error);
    throw error;
  }
}