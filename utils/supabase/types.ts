// Define Subject interface
interface Subject {
    title: string;
    description: string;
    imageUrl: string;
    contents: Content[];
  }
  
  // Define Content interface
  interface Content {
    title: string;
    description: string;
    videoUrl: string;
  }
  
  // Define Course interface that includes subjects and contents
  export interface Course {
    id: number;
    tag: string;
    title: string;
    description: string;
    image_url: string;
    subjects: Subject[];
  }

  
  interface CourseContent {
    id: number;
    title: string;
    finished: boolean;
    quizMark: number | null;
  }
  
  interface CourseSubject {
    id: number;
    name: string;
    contents: CourseContent[];
  }
  
  export interface CourseProgress {
    subjects: CourseSubject[];
    created_at: string;
  }
  
  interface CourseEnrollment {
    course_id: number;
    progress: CourseProgress;
  }
  
  export interface Enrollment {
    id?: string;
    user_id: string;
    courses: CourseEnrollment[];
    created_at?: string;
  }