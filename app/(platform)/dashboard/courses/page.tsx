"use client"
import React, { useEffect , useState  } from "react"
import {CourseList} from "./_components/courseList"


const CoursePage = () => {

  const [courses, setCourses] = useState([]);

    return (
    <>
     <h2> Explore Courses </h2>
     <div>
        <CourseList courses={courses} />
     </div>
     </>
    )
}

export default CoursePage