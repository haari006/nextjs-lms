import React from 'react';


const AssignmentsPage = () => {
  // Hardcoded assignments data
  const assignments = [
    {
      id: 1,
      title: "Essay on Astrophysics",
      description: "Write a 1000-word essay on the topic of astrophysics, covering the latest discoveries and theories.",
      dueDate: "2024-05-20",
      maxPoints: 100,
    },
    {
      id: 2,
      title: "Math Quiz",
      description: "Complete the math quiz covering algebra and calculus concepts.",
      dueDate: "2024-05-25",
      maxPoints: 50,
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">All Assignments</h1>
        <p className="text-gray-700">No assignments at the moment.</p>
    </div>
  );
};

export default AssignmentsPage;
