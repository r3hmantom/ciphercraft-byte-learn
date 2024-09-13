import React from 'react';

const CourseCard = ({ course }: any) => {
    const progress = course.progress.match(/\d+/g)
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
