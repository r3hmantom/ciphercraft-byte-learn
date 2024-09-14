"use client"
import React, { useEffect , useState  } from "react"
import {CourseList} from "./_components/courseList"
import { createClient } from "@/supabase/client"



const CoursePage = () => {

  const supabase = createClient();
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
    if (error) console.log('error', error)
    else setCourses(data)
  }


  useEffect(() =>{
    fetchCourses()
  }, [])
  const [courses, setCourses] = useState<any[]>([]);

    return (
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>
      <div className="space-y-4">
        {courses.length > 0 ? (
          <CourseList courses={courses} />
        ) : (<div className='text-lg'>No courses available at the moment.</div>)
        }
      </div>
    </div>
    )
}

export default CoursePage