import React from 'react';
import { CourseCard } from './courseCard';  // Assuming CourseCard is in the same directory


interface CourseProps {
  id: string;
  name: string;
  description: string;
  numLesson: number;
  imageUrl: string;
  progress: number;
};


const CourseList = ({ courses }: { courses: CourseProps[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export { CourseList };