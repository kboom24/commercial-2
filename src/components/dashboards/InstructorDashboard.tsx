import React from 'react';
import { BookOpen, Users, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COURSES } from '../../data/courses';

export function InstructorDashboard() {
  const { user } = useAuth();
  
  // Filter courses by instructor
  const instructorCourses = COURSES.filter(
    course => course.instructor.name === user.name
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3>Active Courses</h3>
          </div>
          <p className="text-2xl font-bold">{instructorCourses.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3>Total Students</h3>
          </div>
          <p className="text-2xl font-bold">
            {instructorCourses.reduce((acc, course) => acc + course.students, 0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-indigo-600" />
            <h3>Average Rating</h3>
          </div>
          <p className="text-2xl font-bold">
            {(instructorCourses.reduce((acc, course) => acc + course.rating, 0) / instructorCourses.length).toFixed(1)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3>Course Revenue</h3>
          </div>
          <p className="text-2xl font-bold">$24,680</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Student Activity</h3>
          <div className="space-y-4">
            {/* Add student activity list */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Course Performance</h3>
          <div className="space-y-4">
            {/* Add course performance stats */}
          </div>
        </div>
      </div>
    </div>
  );
}