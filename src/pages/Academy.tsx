import React, { useState } from 'react';
import { GraduationCap, PlayCircle, Clock, Users, Star, BookOpen, Award, TrendingUp, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { COURSES } from '../data/courses';
import { CourseDetails } from '../components/CourseDetails';

export function AcademyPage() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const selectedCourseData = selectedCourse 
    ? COURSES.find(course => course.id === selectedCourse)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Iverston Academy</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master multifamily real estate investing with our comprehensive online courses.
          Learn from industry experts and take your investment knowledge to the next level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Award className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Expert Instructors</h3>
          </div>
          <p className="text-gray-600">
            Learn from seasoned professionals with proven track records in multifamily investing.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <BookOpen className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Practical Knowledge</h3>
          </div>
          <p className="text-gray-600">
            Real-world case studies and hands-on exercises to build practical investment skills.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <TrendingUp className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Career Growth</h3>
          </div>
          <p className="text-gray-600">
            Enhance your career prospects and build a strong foundation in real estate investing.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">Featured Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedCourse(course.id)}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded">
                  {course.level}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <PlayCircle className="w-4 h-4 text-gray-600" />
                  <span>{course.modules.length} modules</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${course.price}</span>
                <button 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse(course.id);
                  }}
                >
                  {user?.enrolledCourses.includes(course.id) ? 'Continue Learning' : 'View Details'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-indigo-50 rounded-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <Building2 className="w-10 h-10 text-indigo-600" />
          <h2 className="text-2xl font-bold">Custom Training for Teams</h2>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Looking to train your investment team? We offer customized corporate training programs
          tailored to your organization's needs.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Contact for Corporate Training
        </button>
      </div>

      {selectedCourseData && (
        <CourseDetails
          course={selectedCourseData}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}