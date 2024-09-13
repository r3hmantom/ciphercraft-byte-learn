import React from "react"
import {CourseList} from "./_components/courseList"
const courses = [
    {
      id: 'course1',
      name: 'Introduction to Programming',
      description: 'Learn the fundamentals of programming with Python.',
      numLesson: 10,
      imageUrl: 'https://picsum.photos/300/200',
      progress: 30,
    },
    {
      id: 'course2',
      name: 'Web Development with React',
      description: 'Build interactive web applications using React.',
      numLesson: 15,
      imageUrl: 'https://picsum.photos/300/200',
      progress: 60,
    },
    {
      id: 'course3',
      name: 'Data Science with Python',
      description: 'Analyze data and extract insights using Python.',
      numLesson: 20,
      imageUrl: 'https://picsum.photos/300/200',
      progress: 80,
    },
    // Add more courses as needed
  ];
const CoursePage = () => {
    return (
    <>
     <h2> Explore Courses </h2>
     <div>
        <CourseList courses={courses} />
     </div> </>
    )
}

export default CoursePage