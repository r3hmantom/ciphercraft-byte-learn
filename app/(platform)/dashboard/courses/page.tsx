"use client"
import React, { useEffect , useState  } from "react"
import {CourseList} from "./_components/courseList"
import { createClient } from "@/supabase/client"
import { useUser } from "@clerk/nextjs"



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
  const { user, isSignedIn } = useUser()

  const [userProgress, setUserProgress] = useState<any[]>([])
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);


  const fetchCoursesByIds = async (courseIds: string[]) => {
      try {
          const { data, error } = await supabase
              .from('courses')
              .select('*')
              .in('id', courseIds);

          if (error) {
              console.error('Error fetching courses:', error);
              return [];
          }
          return data;
      } catch (err) {
          console.error('Unexpected error:', err);
          return [];
      }
  };

  useEffect(() => {
      const fetchProgress = async () => {
          const { data: progress, error: progressError } = await supabase
              .from('Users')
              .select('progress')
              .eq("id", user?.id)
          if (progressError) {
              console.log(progressError);
          } else {
              const courses = progress[0]?.progress || [];
              console.log("courses ", courses);

              const courseIDs = courses.map((course: any) => course.id)
              const courseProgress = courses.map((course: any) => course.prog)
              const coursesData = await fetchCoursesByIds(courseIDs);
              const updatedCoursesData = coursesData.map(course => {
                  const matchingCourse = courses.find((c: any) => c.id == course.id);
                  console.log("matchingCourse ", matchingCourse);
                  return {
                      ...course,
                      progress: matchingCourse.progress
                  };
              });

              console.log("coursesData", updatedCoursesData);
              setEnrolledCourses(updatedCoursesData);
          }
      };

      fetchProgress();
  }, []);


    return (
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>
      <div className="space-y-4">
        {courses.length > 0 ? (
          <CourseList courses={enrolledCourses} />
        ) : (<div className='text-lg'>No courses available at the moment.</div>)
        }
      </div>
    </div>
    )
}

export default CoursePage