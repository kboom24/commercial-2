import React from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../data/courses';
import { CourseDetails } from '../components/CourseDetails';
import { BookOpen, PlayCircle } from 'lucide-react';

export function MyCoursesPage() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  if (!user) return null;

  const enrolledCourses = COURSES.filter(course => 
    user.enrolledCourses.includes(course.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <h1 className="text-2xl font-bold">My Courses</h1>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <PlayCircle className="w-4 h-4" />
                  <span>{course.modules.length} modules</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: '25%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">25% completed</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}