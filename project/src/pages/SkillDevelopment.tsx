import React, { useEffect, useState } from 'react';
import { 
  Book, CheckCircle2, Trophy, Star, Zap, Target, Brain, Code, 
  PenTool, Heart, Github, Twitter, Linkedin, MessageCircle,
  BarChart3, Award, Flame, Calendar, Clock, ArrowRight,
  Rocket, Users, BookOpen, Layout
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

function SkillCard({ icon: Icon, title, description, level, progress }: {
  icon: React.ElementType;
  title: string;
  description: string;
  level: string;
  progress: number;
}) {
  return (
    <div className="bg-primary-800 rounded-xl p-6 border border-primary-700 hover:border-accent-500 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-900/50 rounded-lg">
            <Icon className="w-6 h-6 text-accent-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <span className="text-sm text-accent-500">{level}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="text-accent-500 font-medium">{progress}%</span>
        </div>
        <div className="h-2 bg-primary-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend }: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
}) {
  return (
    <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-primary-900/50 rounded-lg">
          <Icon className="w-5 h-5 text-accent-500" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-accent-500">{value}</p>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend.isPositive ? '+' : '-'}{trend.value}%</span>
            <ArrowRight className={`w-4 h-4 ${trend.isPositive ? 'rotate-0' : 'rotate-90'}`} />
          </div>
        )}
      </div>
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; title: string } | null>(null);

  useEffect(() => {
    async function getProfile() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, title')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    }

    getProfile();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <header className="bg-primary-800 border-b border-primary-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="w-8 h-8 text-accent-500" />
              <span className="text-xl font-bold text-white">SkillQuest</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-accent-500 transition-colors">Home</Link>
              <Link to="/skill-development" className="text-accent-500">Dashboard</Link>
              <Link to="/courses" className="text-gray-300 hover:text-accent-500 transition-colors">Courses</Link>
              <Link to="/community" className="text-gray-300 hover:text-accent-500 transition-colors">Community</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-accent-500/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent-500" />
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{profile?.full_name || 'Loading...'}</p>
                <p className="text-sm text-accent-500">{profile?.title || ''}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-accent-500 text-primary-900 px-4 py-2 rounded-full font-semibold hover:bg-accent-400 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SkillDevelopment() {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Master modern frontend frameworks and responsive design principles",
      level: "Advanced",
      progress: 75
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      description: "Learn user interface design patterns and user experience best practices",
      level: "Intermediate",
      progress: 45
    },
    {
      icon: BookOpen,
      title: "Backend Development",
      description: "Build scalable server-side applications and RESTful APIs",
      level: "Beginner",
      progress: 20
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Develop skills in version control, code review, and agile methodologies",
      level: "Advanced",
      progress: 90
    }
  ];

  return (
    <div className="min-h-screen bg-primary-900 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={Flame} 
            title="Learning Streak" 
            value="15 Days"
            trend={{ value: 25, isPositive: true }}
          />
          <StatCard 
            icon={Brain} 
            title="Skills Mastered" 
            value="8"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            icon={Star} 
            title="XP Earned" 
            value="2,450"
            trend={{ value: 18, isPositive: true }}
          />
          <StatCard 
            icon={Trophy} 
            title="Achievements" 
            value="12"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Current Skills */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-bold text-white">Skills in Progress</h2>
            </div>
            <button className="text-accent-500 hover:text-accent-400 transition-colors">
              View All Skills
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Rocket className="w-6 h-6 text-accent-500" />
              <h2 className="text-xl font-bold text-white">Your Learning Path</h2>
            </div>
            <button className="text-accent-500 hover:text-accent-400 transition-colors">
              Customize Path
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-primary-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-accent-500" />
                  <h3 className="font-medium text-white">Advanced React Patterns</h3>
                </div>
                <span className="text-sm text-gray-400">Next Milestone</span>
              </div>
              <div className="h-2 bg-primary-900 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
            
            <div className="bg-primary-900/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Layout className="w-5 h-5 text-accent-500" />
                  <h3 className="font-medium text-white">Responsive Design Mastery</h3>
                </div>
                <span className="text-sm text-gray-400">Upcoming</span>
              </div>
              <div className="h-2 bg-primary-900 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-accent-500 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary-800 border-t border-primary-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link to="/" className="text-gray-400 hover:text-accent-500 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link to="/" className="text-gray-400 hover:text-accent-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="/" className="text-gray-400 hover:text-accent-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SkillQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SkillDevelopment;