// Define Subject interface
interface Subject {
    id: number;
    title: string;
  }
  
  // Define Content interface
  interface Content {
    id: number;
    title: string;
    description: string;
    // Add more properties as needed
  }
  
  // Define Course interface that includes subjects and contents
  interface Course {
    id: number;
    title: string;
    description: string;
    image_url: string;
    subjects: Subject[];
    contents: Content[];
  }
  
  export default Course;

  
