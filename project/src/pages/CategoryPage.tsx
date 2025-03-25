import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, Users, Star, ChevronRight, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  description?: string;
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="bg-primary-800 rounded-xl overflow-hidden border border-primary-700 hover:border-accent-500 transition-all duration-300 group"
    >
      <div className="relative h-48">
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
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-accent-500">{course.category}</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-400">{course.level}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">{course.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center text-accent-500 group-hover:text-accent-400 transition-colors">
            <span className="text-sm font-medium">Learn More</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

const categoryData: Record<string, { title: string; description: string; courses: Course[] }> = {
  development: {
    title: "Development Courses",
    description: "Master programming and software development with our comprehensive courses",
    courses: [
      {
        id: 1,
        title: "Full Stack Web Development",
        category: "Development",
        level: "Advanced",
        rating: 4.8,
        students: 15234,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
        description: "Master modern web development with this comprehensive course"
      },
      {
        id: 2,
        title: "Mobile App Development",
        category: "Development",
        level: "Intermediate",
        rating: 4.7,
        students: 12543,
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80"
      },
      {
        id: 3,
        title: "Python Programming",
        category: "Development",
        level: "Beginner",
        rating: 4.9,
        students: 18765,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80"
      }
    ]
  },
  design: {
    title: "Design Courses",
    description: "Learn digital and graphic design from industry experts",
    courses: [
      {
        id: 4,
        title: "UX/UI Design Fundamentals",
        category: "Design",
        level: "Beginner",
        rating: 4.7,
        students: 8562,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80"
      },
      {
        id: 5,
        title: "Advanced UI Design",
        category: "Design",
        level: "Advanced",
        rating: 4.8,
        students: 6789,
        image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?auto=format&fit=crop&q=80"
      }
    ]
  },
  culinary: {
    title: "Culinary Arts Courses",
    description: "Master the art of cooking with professional chefs",
    courses: [
      {
        id: 6,
        title: "Professional Pastry & Baking",
        category: "Culinary",
        level: "Intermediate",
        rating: 4.9,
        students: 3245,
        image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80"
      },
      {
        id: 7,
        title: "International Cuisine",
        category: "Culinary",
        level: "Advanced",
        rating: 4.8,
        students: 4532,
        image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80"
      }
    ]
  },
  music: {
    title: "Music Courses",
    description: "Learn music production and performance from professionals",
    courses: [
      {
        id: 8,
        title: "Music Production Masterclass",
        category: "Music",
        level: "Intermediate",
        rating: 4.8,
        students: 5678,
        image: "https://images.unsplash.com/photo-1598488035139-bdaa7536c060?auto=format&fit=crop&q=80"
      },
      {
        id: 9,
        title: "Guitar Fundamentals",
        category: "Music",
        level: "Beginner",
        rating: 4.7,
        students: 7890,
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80"
      }
    ]
  }
};

function CategoryPage() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const categoryInfo = category ? categoryData[category] : null;

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-primary-900 text-white">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
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

  const filteredCourses = categoryInfo.courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <Link 
            to="/explore" 
            className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{categoryInfo.title}</h1>
          <p className="text-gray-400 max-w-2xl">{categoryInfo.description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${category} courses...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
            />
          </div>
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-800 border border-primary-700 rounded-lg hover:border-accent-500 transition-all"
          >
            <Filter className="w-5 h-5 text-accent-500" />
            <span className="text-white">Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No courses found matching your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default CategoryPage;