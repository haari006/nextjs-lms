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

export async function fetchCourseByID(id: string): Promise<Course> {
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchSubjectByIndex(courseID: string, index: number): Promise<Course["subjects"][number]> {
  try {
    // Fetch the course by its ID
    const course = await fetchCourseByID(courseID);
    
    // Get the subject based on the index
    const subject = course.subjects[index];
    
    return subject;
  } catch (error:any) {
    throw new Error('Failed to fetch subject: ' + error.message);
  }
}