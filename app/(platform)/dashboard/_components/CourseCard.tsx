import React , {useState, useEffect} from 'react';
import { createClient } from '@/supabase/client';
import { useUser } from '@clerk/nextjs';

const CourseCard = ({ course }: any) => {
    const progress = course.progress.match(/\d+/g)

    const supabase = createClient()
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
        <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{course.name}</h2>
                    <p className="text-sm text-gray-500">
                        {(course.numLessons * progress) / 100} / {course.numLessons} lessons
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex-grow bg-gray-200 rounded-full h-1">
                        <div
                            className="bg-black h-1 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-sm font-medium">{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
