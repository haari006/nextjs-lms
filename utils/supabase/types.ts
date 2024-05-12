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
  interface Course {
    id: number;
    title: string;
    description: string;
    image_url: string;
    subjects: Subject[];
  }
  
  export default Course;

  
