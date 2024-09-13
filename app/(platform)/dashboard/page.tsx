"use client"
import React, { useEffect, useState } from 'react';
import CourseCard from './_components/CourseCard';
import { createClient } from '@/supabase/client';
import { useUser } from '@clerk/nextjs';
import AddUserToSupabase from '@/lib/addUserToSupabase';

interface Course {
    name: string;
    description: string;
    numLessons: number;
    progress: number;
}


const ProgressPage = () => {
    const supabase = createClient()
    const { user, isSignedIn } = useUser()

    const [userProgress, setUserProgress] = useState<any[]>([])
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

    useEffect(() => {
        AddUserToSupabase(user, isSignedIn || false)
    }, [])

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
            <h1 className="text-3xl font-bold mb-6">Your Course Progress</h1>
            <div className="space-y-4">
                {enrolledCourses.length > 0 ? (enrolledCourses?.map((course: any) => (
                    <CourseCard key={course.id} course={course} />
                ))) : (<div className='text-lg'>You haven't enrolled in any courses</div>)
                }
            </div>
        </div>
    );
};

export default ProgressPage;