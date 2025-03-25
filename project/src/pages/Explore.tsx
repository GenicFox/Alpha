import React, { useState } from 'react';
import { Search, Filter, Users, Star, ChevronRight, X, Code, PenTool, ChefHat, Music, Camera, Palette, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
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

interface Category {
  name: string;
  description: string;
  icon: React.ElementType;
  courses: Course[];
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

function FilterModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-primary-800 rounded-xl p-8 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6">Filter Courses</h2>
        {/* Add filter options here */}
      </div>
    </div>
  );
}

export const categories: Category[] = [
  {
    name: "Development",
    description: "Learn programming and software development",
    icon: Code,
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
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80",
        description: "Build native mobile apps for iOS and Android platforms"
      },
      {
        id: 3,
        title: "Python Programming",
        category: "Development",
        level: "Beginner",
        rating: 4.9,
        students: 18765,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
        description: "Learn Python programming from scratch with practical projects"
      }
    ]
  },
  {
    name: "Design",
    description: "Master digital and graphic design",
    icon: PenTool,
    courses: [
      {
        id: 4,
        title: "UX/UI Design Fundamentals",
        category: "Design",
        level: "Beginner",
        rating: 4.7,
        students: 8562,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80",
        description: "Learn the fundamentals of user experience and interface design"
      },
      {
        id: 5,
        title: "Advanced UI Design",
        category: "Design",
        level: "Advanced",
        rating: 4.8,
        students: 6789,
        image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?auto=format&fit=crop&q=80",
        description: "Master advanced UI design techniques and principles"
      }
    ]
  },
  {
    name: "Culinary Arts",
    description: "Learn professional cooking and baking",
    icon: ChefHat,
    courses: [
      {
        id: 6,
        title: "Professional Pastry & Baking",
        category: "Culinary",
        level: "Intermediate",
        rating: 4.9,
        students: 3245,
        image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80",
        description: "Master the art of pastry making with hands-on practice"
      },
      {
        id: 7,
        title: "International Cuisine",
        category: "Culinary",
        level: "Advanced",
        rating: 4.8,
        students: 4532,
        image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80",
        description: "Explore and master cuisines from around the world"
      }
    ]
  },
  {
    name: "Music",
    description: "Learn instruments and music production",
    icon: Music,
    courses: [
      {
        id: 8,
        title: "Music Production Masterclass",
        category: "Music",
        level: "Intermediate",
        rating: 4.8,
        students: 5678,
        image: "https://images.unsplash.com/photo-1598488035139-bdaa7536c060?auto=format&fit=crop&q=80",
        description: "Learn professional music production techniques"
      },
      {
        id: 9,
        title: "Guitar Fundamentals",
        category: "Music",
        level: "Beginner",
        rating: 4.7,
        students: 7890,
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80",
        description: "Master the basics of playing guitar"
      }
    ]
  },
  {
    name: "Photography",
    description: "Master digital photography and editing",
    icon: Camera,
    courses: [
      {
        id: 10,
        title: "Digital Photography Fundamentals",
        category: "Photography",
        level: "Beginner",
        rating: 4.6,
        students: 4321,
        image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80",
        description: "Learn the basics of digital photography"
      },
      {
        id: 11,
        title: "Advanced Photography",
        category: "Photography",
        level: "Advanced",
        rating: 4.8,
        students: 3456,
        image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80",
        description: "Master advanced photography techniques"
      }
    ]
  },
  {
    name: "Fine Arts",
    description: "Develop your artistic skills",
    icon: Palette,
    courses: [
      {
        id: 12,
        title: "Oil Painting Masterclass",
        category: "Fine Arts",
        level: "Intermediate",
        rating: 4.7,
        students: 2890,
        image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&q=80",
        description: "Master oil painting techniques from scratch"
      }
    ]
  },
  {
    name: "Voice & Speech",
    description: "Improve your vocal abilities",
    icon: Mic,
    courses: [
      {
        id: 13,
        title: "Professional Voice Training",
        category: "Voice",
        level: "Beginner",
        rating: 4.8,
        students: 3456,
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80",
        description: "Develop your voice for singing and speaking"
      }
    ]
  }
];

function Explore() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const allCourses = categories.flatMap(category => category.courses);

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 4);
  const displayedCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 4);

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header currentPage="explore" />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">Explore Courses</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses..."
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
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Categories</h2>
            <button 
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              {showAllCategories ? 'Show Less' : 'View All'}
            </button>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${showAllCategories ? '' : 'md:grid-rows-1'}`}>
            {displayedCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase()}`}
                  className="p-6 bg-primary-800 rounded-lg border border-primary-700 hover:border-accent-500 transition-all text-left"
                >
                  <Icon className="w-8 h-8 text-accent-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <button 
              onClick={() => setShowAllCourses(!showAllCourses)}
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              {showAllCourses ? 'Show Less' : 'View All'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
              />
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No courses found matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>

      {isFilterModalOpen && (
        <FilterModal onClose={() => setIsFilterModalOpen(false)} />
      )}
    </div>
  );
}

export default Explore;