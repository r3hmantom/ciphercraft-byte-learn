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
    <>
     <div>
        <CourseList courses={courses} />
     </div>
     </>
    )
}

export default CoursePage