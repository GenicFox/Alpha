import React, { useState } from 'react';
import { 
  Book, CheckCircle2, Trophy, Star, Zap, Target, Brain, Code, 
  PenTool, Heart, Github, Twitter, Linkedin, MessageCircle,
  BarChart3, Award, Flame, Calendar, Clock, ArrowRight,
  Rocket, Users, BookOpen, Layout, Mail, Lock, User, Compass,
  LogIn, UserPlus, X, Scroll, Terminal
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthForm } from '../hooks/useAuthForm';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import AdSlideshow from '../components/AdSlideshow';

type AuthMode = 'login' | 'register';

function AuthModal({ isOpen, onClose, mode }: { isOpen: boolean; onClose: () => void; mode: AuthMode }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    careerGoal: ''
  });

  const { handleSubmit, loading, errors } = useAuthForm({
    mode,
    onSuccess: onClose
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md mx-4 bg-primary-800 rounded-2xl shadow-2xl transform transition-all">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-transparent" />
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364FFDA' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }} />
        </div>

        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-8">
            {mode === 'login' ? (
              <>
                <LogIn className="w-10 h-10 text-accent-500" />
                <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              </>
            ) : (
              <>
                <UserPlus className="w-10 h-10 text-accent-500" />
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
              </>
            )}
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }} className="space-y-6">
            {mode === 'register' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      className={`w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border text-white focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-primary-700 focus:border-accent-500 focus:ring-accent-500'
                      }`}
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Career Goal
                  </label>
                  <div className="relative">
                    <Compass className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      required
                      className={`w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border text-white focus:outline-none focus:ring-1 transition-all ${
                        errors.careerGoal ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-primary-700 focus:border-accent-500 focus:ring-accent-500'
                      }`}
                      rows={3}
                      value={formData.careerGoal}
                      onChange={(e) => setFormData(prev => ({ ...prev, careerGoal: e.target.value }))}
                      placeholder="What's your career aspiration?"
                    />
                    {errors.careerGoal && (
                      <p className="mt-1 text-sm text-red-500">{errors.careerGoal}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border text-white focus:outline-none focus:ring-1 transition-all ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-primary-700 focus:border-accent-500 focus:ring-accent-500'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-primary-900/50 border text-white focus:outline-none focus:ring-1 transition-all ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-primary-700 focus:border-accent-500 focus:ring-accent-500'
                  }`}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-500 text-primary-900 py-2 px-4 rounded-lg font-semibold hover:bg-accent-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 h-11"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-400">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ email: '', password: '', fullName: '', careerGoal: '' });
                      onClose();
                    }}
                    className="text-accent-500 hover:text-accent-400 transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ email: '', password: '', fullName: '', careerGoal: '' });
                      onClose();
                    }}
                    className="text-accent-500 hover:text-accent-400 transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function QuestCard({ title, description, reward, progress, difficulty }: {
  title: string;
  description: string;
  reward: string;
  progress: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}) {
  const navigate = useNavigate();
  const difficultyColors = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400'
  };

  const handleClick = () => {
    if (title === "Complete Coding Challenge") {
      navigate('/challenge/coding');
    } else if (title === "Study Session") {
      navigate('/study-session');
    } else if (title === "Project Milestone") {
      navigate('/project-milestone');
    } else if (title === "Peer Review") {
      navigate('/peer-review');
    }
  };

  return (
    <div 
      className="bg-primary-800 rounded-xl p-6 border border-primary-700 hover:border-accent-500 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <Scroll className="w-5 h-5 text-accent-500" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <span className={`text-sm ${difficultyColors[difficulty]}`}>{difficulty}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">{reward}</span>
        </div>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
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

function ExploreCard({ icon: Icon, title, description, path, image }: {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  image: string;
}) {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(path)}
      className="bg-primary-800 rounded-xl overflow-hidden border border-primary-700 hover:border-accent-500 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-40">
        <div className="absolute inset-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-800 via-primary-800/50 to-transparent" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-primary-900/50 rounded-lg group-hover:bg-accent-500/10 transition-colors">
            <Icon className="w-6 h-6 text-accent-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex items-center text-accent-500 group-hover:text-accent-400 transition-colors">
          <span className="font-medium">Explore</span>
          <ArrowRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-800 border-t border-primary-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-8 h-8 text-accent-500" />
              <span className="text-xl font-bold text-white">Target Compass</span>
            </div>
            <p className="text-gray-400">
              Empowering learners to achieve their goals through focused guidance and comprehensive training.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-accent-500 transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-accent-500 transition-colors">Courses</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-accent-500 transition-colors">Resources</Link></li>
              <li><Link to="/success-stories" className="text-gray-400 hover:text-accent-500 transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-accent-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-accent-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-accent-500 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-accent-500 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@targetcompass.com</li>
              <li className="text-gray-400">1-800-TARGET-COMPASS</li>
              <li className="text-gray-400">123 Target Street</li>
              <li className="text-gray-400">Compass City, TC 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Target Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: AuthMode }>({
    isOpen: false,
    mode: 'register'
  });

  const dailyQuests = [
    {
      title: "Complete Coding Challenge",
      description: "Solve today's algorithmic puzzle to strengthen your problem-solving skills",
      reward: "50 XP",
      progress: 75,
      difficulty: "Medium" as const
    },
    {
      title: "Study Session",
      description: "Complete a 30-minute focused learning session on your chosen topic",
      reward: "30 XP",
      progress: 100,
      difficulty: "Easy" as const
    },
    {
      title: "Project Milestone",
      description: "Reach your next project milestone by implementing a key feature",
      reward: "100 XP",
      progress: 45,
      difficulty: "Hard" as const
    },
    {
      title: "Peer Review",
      description: "Review and provide feedback on a peer's code submission",
      reward: "40 XP",
      progress: 0,
      difficulty: "Medium" as const
    }
  ];

  return (
    <div className="min-h-screen bg-primary-900 text-white flex flex-col">
      <Header 
        currentPage="home" 
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })} 
      />

      <main className="flex-grow">
        <div className="relative h-[600px] flex items-center justify-center pt-16">
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2)'
            }}
          />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <Compass 
              className="w-24 h-24 mx-auto mb-6 text-accent-500"
              strokeWidth={2}
            />
            <h1 className="text-5xl font-bold mb-6">Daily Quests Await!</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Level up your skills with daily challenges, earn rewards, and track your progress on your learning journey.
            </p>
            <button
              onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
              className="bg-accent-500 text-primary-900 px-8 py-3 rounded-full font-semibold hover:bg-accent-400 transition-colors duration-300 inline-block"
            >
              Start Your Quest
            </button>
          </div>
        </div>

        {session && (
          <div className="container mx-auto px-4 py-20">
            <AdSlideshow />
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Scroll className="w-8 h-8 text-accent-500" />
                <h2 className="text-3xl font-bold">Daily Quests</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-lg font-semibold">3 Day Streak!</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold">240 XP</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {dailyQuests.map((quest, index) => (
                <QuestCard key={index} {...quest} />
              ))}
            </div>

            <div className="bg-primary-800 rounded-xl p-8 border border-primary-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold">Weekly Challenge</h3>
                </div>
                <span className="text-accent-500 font-semibold">5 days remaining</span>
              </div>
              <p className="text-gray-300 mb-6">
                Complete all daily quests for 7 consecutive days to earn a special reward and unlock advanced challenges!
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-accent-500 font-medium">2/7 days</span>
                </div>
                <div className="h-3 bg-primary-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-500 to-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: '28.5%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-primary-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Your Learning Path</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Choose from multiple learning paths and start your journey to mastery. Each path offers unique challenges and rewards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              <ExploreCard 
                icon={Code}
                title="Coding Challenges"
                description="Test your skills with daily coding puzzles and algorithmic challenges"
                path="/challenge/coding"
                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
              />
              <ExploreCard 
                icon={Brain}
                title="Problem Solving"
                description="Enhance your analytical thinking with diverse problem-solving exercises"
                path="/explore"
                image="https://images.unsplash.com/photo-1509869175650-a1d97972541a?auto=format&fit=crop&q=80"
              />
              <ExploreCard 
                icon={Terminal}
                title="Practice Projects"
                description="Build real-world projects to strengthen your practical skills"
                path="/explore"
                image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
              />
              <ExploreCard 
                icon={Users}
                title="Community Tasks"
                description="Collaborate with others on group challenges and peer reviews"
                path="/explore"
                image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Quest?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join our community of learners and start your daily learning adventures.
              </p>
              <button
                onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                className="bg-accent-500 text-primary-900 px-8 py-3 rounded-full font-semibold hover:bg-accent-400 transition-colors duration-300 inline-block"
              >
                Start Now
              </button>
            </div>

            <div className="mt-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">About Target Compass</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  We're on a mission to transform learning into an engaging adventure, helping you master new skills through daily challenges and interactive experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-primary-800 rounded-xl p-8 border border-primary-700 hover:border-accent-500 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mb-6">
                    <Compass className="w-6 h-6 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Focused Learning</h3>
                  <p className="text-gray-400">
                    Our platform adapts to your goals, providing personalized learning paths and targeted challenges to accelerate your growth.
                  </p>
                </div>

                <div className="bg-primary-800 rounded-xl p-8 border border-primary-700 hover:border-accent-500 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mb-6">
                    <Trophy className="w-6 h-6 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Gamified Progress</h3>
                  <p className="text-gray-400">
                    Turn learning into an adventure with experience points, achievements, and daily quests that make skill development exciting.
                  </p>
                </div>

                <div className="bg-primary-800 rounded-xl p-8 border border-primary-700 hover:border-accent-500 transition-all duration-300">
                  <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
                  <p className="text-gray-400">
                    Join a vibrant community of learners, share knowledge, and grow together through collaborative challenges and peer support.
                  </p>
                </div>
              </div>

              <div className="mt-16 bg-primary-800 rounded-xl p-8 border border-primary-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent-500 mb-2">50,000+</div>
                    <p className="text-gray-400">Active Learners</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent-500 mb-2">1,000+</div>
                    <p className="text-gray-400">Daily Challenges</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent-500 mb-2">95%</div>
                    <p className="text-gray-400">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {authModal.isOpen && (
        <AuthModal 
          isOpen={authModal.isOpen}
          mode={authModal.mode}
          onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        />
      )}
    </div>
  );
}

export default Home;