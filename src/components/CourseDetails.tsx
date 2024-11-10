import React from 'react';
import { Clock, Users, Star, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { Course, UserProgress } from '../types';
import { useAuth } from '../context/AuthContext';

interface CourseDetailsProps {
  course: Course;
  onClose: () => void;
}

export function CourseDetails({ course, onClose }: CourseDetailsProps) {
  const { user, enrollInCourse, getCourseProgress } = useAuth();
  const progress = user ? getCourseProgress(course.id) : undefined;
  const isEnrolled = user?.enrolledCourses.includes(course.id);

  const handleEnroll = () => {
    if (user) {
      enrollInCourse(course.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
            {!isEnrolled && (
              <button
                onClick={handleEnroll}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Enroll Now - ${course.price}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Course Description</h3>
              <p className="text-gray-600 mb-6">{course.description}</p>

              <h3 className="text-xl font-semibold mb-4">Course Content</h3>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="border rounded-lg">
                    <div className="p-4 bg-gray-50 border-b">
                      <h4 className="font-medium">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.duration}</p>
                    </div>
                    <div className="divide-y">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.type === 'video' ? (
                              <PlayCircle className="w-5 h-5 text-indigo-600" />
                            ) : (
                              <Star className="w-5 h-5 text-indigo-600" />
                            )}
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-sm text-gray-600">
                                {lesson.duration}
                              </p>
                            </div>
                          </div>
                          {isEnrolled ? (
                            progress?.completedLessons.includes(lesson.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <button className="text-indigo-600 hover:text-indigo-700">
                                Start
                              </button>
                            )
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{course.instructor.name}</h4>
                    <p className="text-gray-600">{course.instructor.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}