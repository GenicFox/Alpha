import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Calendar, GraduationCap, Clock, CheckCircle, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { categories } from './Explore';

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  description?: string;
  duration?: string;
  timeCommitment?: string;
  instructor?: {
    name: string;
    title: string;
    image: string;
  };
  curriculum?: {
    title: string;
    lessons: string[];
  }[];
}

function SimilarCourseCard({ course }: { course: Course }) {
  return (
    <Link 
      to={`/course/${course.id}`}
      className="bg-primary-800 rounded-xl overflow-hidden border border-primary-700 hover:border-accent-500 transition-all duration-300 group"
    >
      <div className="relative h-40">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary-900/90 px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-white">{course.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-accent-500">{course.category}</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-400">{course.level}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">{course.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center text-accent-500 group-hover:text-accent-400 transition-colors">
            <span className="text-sm font-medium">View Course</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function CourseDetails() {
  const { id } = useParams();
  const courseId = parseInt(id || '1');

  // Find the course in our categories data
  const allCourses = categories.flatMap(category => category.courses);
  const course = allCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-primary-900 text-white">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course not found</h1>
            <Link 
              to="/explore" 
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              Return to Explore
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Find similar courses from the same category
  const similarCourses = allCourses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  // Add additional course details
  const courseDetails = {
    ...course,
    duration: "12 weeks",
    timeCommitment: "5-10 hours/week",
    instructor: {
      name: `${course.category} Expert`,
      title: `Senior ${course.category} Instructor`,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    },
    curriculum: [
      {
        title: "Getting Started",
        lessons: ["Introduction", "Setting up your environment", "Basic concepts"]
      },
      {
        title: "Core Concepts",
        lessons: ["Fundamental principles", "Best practices", "Common patterns"]
      },
      {
        title: "Advanced Topics",
        lessons: ["Advanced techniques", "Real-world applications", "Final project"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="pt-24 pb-12">
        <div className="relative h-[400px] mb-8">
          <img 
            src={courseDetails.image}
            alt={courseDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/50 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl">
              <Link 
                to="/explore" 
                className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-accent-500">{courseDetails.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{courseDetails.level}</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-4">{courseDetails.title}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">{courseDetails.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="w-5 h-5" />
                      <span>{courseDetails.students.toLocaleString()} students</span>
                    </div>
                  </div>
                </div>
                <Link 
                  to={`/course/${courseId}/enroll`}
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <h3 className="font-medium">Duration</h3>
                </div>
                <p className="text-gray-400">{courseDetails.duration}</p>
              </div>
              <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
                <div className="flex items-center space-x-3 mb-2">
                  <GraduationCap className="w-5 h-5 text-accent-500" />
                  <h3 className="font-medium">Certificate</h3>
                </div>
                <p className="text-gray-400">Upon completion</p>
              </div>
              <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <h3 className="font-medium">Time Commitment</h3>
                </div>
                <p className="text-gray-400">{courseDetails.timeCommitment}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
                  <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                  <p className="text-gray-400 mb-6">{courseDetails.description}</p>
                  
                  <h3 className="font-semibold mb-3">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      `Master ${courseDetails.category} fundamentals`,
                      "Industry best practices",
                      "Real-world projects",
                      "Professional workflows",
                      "Problem-solving skills",
                      "Career advancement"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
                  <h2 className="text-xl font-semibold mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {courseDetails.curriculum?.map((section, index) => (
                      <div key={index} className="bg-primary-900/50 rounded-lg p-4">
                        <h3 className="font-semibold mb-3">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center space-x-2 text-gray-400">
                              <BookOpen className="w-4 h-4 text-accent-500" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
                  <h2 className="text-xl font-semibold mb-4">Your Instructor</h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={courseDetails.instructor?.image}
                      alt={courseDetails.instructor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{courseDetails.instructor?.name}</h3>
                      <p className="text-accent-500">{courseDetails.instructor?.title}</p>
                    </div>
                  </div>
                  <p className="text-gray-400">
                    Expert instructor with extensive experience in {courseDetails.category.toLowerCase()} and education.
                  </p>
                </div>

                <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
                  <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>Basic understanding of {courseDetails.category.toLowerCase()}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>Commitment to learning</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>Passion for the subject</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {similarCourses.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Similar Courses</h2>
                  <Link 
                    to="/explore" 
                    className="text-accent-500 hover:text-accent-400 transition-colors flex items-center"
                  >
                    View All Courses
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarCourses.map((course) => (
                    <SimilarCourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseDetails;