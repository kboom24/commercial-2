import React from 'react';
import { Mail, Linkedin, Award, BookOpen, Users, GraduationCap } from 'lucide-react';
import { COURSES } from '../data/courses';

// Get unique instructors from courses
const instructors = Array.from(
  new Map(COURSES.map(course => [course.instructor.name, course.instructor]))
).map(([_, instructor]) => instructor);

export function InstructorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Expert Instructors</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn from industry leaders with decades of experience in multifamily real estate investment.
          Our instructors bring real-world expertise to every course.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Award className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Industry Veterans</h3>
          </div>
          <p className="text-gray-600">
            Combined experience of over 100 years in real estate investment and management.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <BookOpen className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Proven Track Record</h3>
          </div>
          <p className="text-gray-600">
            Successfully managed billions in real estate assets and transactions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-indigo-600">
            <Users className="w-8 h-8" />
            <h3 className="text-lg font-semibold">Student Success</h3>
          </div>
          <p className="text-gray-600">
            Mentored thousands of successful real estate investors and professionals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors.map((instructor, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
              <p className="text-indigo-600 mb-4">{instructor.title}</p>
              <p className="text-gray-600 mb-6">{instructor.bio}</p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
                  <Mail className="w-5 h-5" />
                  <span>Contact</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-indigo-50 rounded-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <GraduationCap className="w-10 h-10 text-indigo-600" />
          <h2 className="text-2xl font-bold">Become an Instructor</h2>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Are you an experienced real estate professional? Join our team of expert instructors
          and share your knowledge with the next generation of investors.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Apply to Teach
        </button>
      </div>
    </div>
  );
}