import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CourseProps {
    id: string;
    name: string;
    description: string;
    numLesson: number;
    imageUrl: string;
    progress: number;
};

const CourseCard = ({ course }: { course: CourseProps }) => {
    return (
        <Card className="w-full max-w-sm overflow-hidden">
            <CardHeader className="p-0">
                <img
                    src={course.imageUrl || "/api/placeholder/300/200"}
                    alt={course.name}
                    className="w-full h-40 object-cover"
                />
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="w-full" />
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Continue Course
                </button>
            </CardFooter>
        </Card>
    )
};

export { CourseCard };