import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Trophy, Medal, Compass, Settings, LogOut, ChevronDown, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface HeaderProps {
  currentPage?: 'home' | 'explore' | 'contact';
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

interface UserProfile {
  full_name: string;
  career_goal: string;
}

export default function Header({ currentPage, onOpenAuth }: HeaderProps) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        if (!session?.user) return;
        
        const { data, error } = await supabase
          .from('user_profiles')
          .select('full_name, career_goal')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
          return;
        }

        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error in profile fetch:', error);
      }
    }

    getProfile();
  }, [session]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <header className="fixed w-full bg-primary-900/95 backdrop-blur-sm z-50 border-b border-primary-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Compass 
              className="w-8 h-8 text-accent-500"
              strokeWidth={2.5}
            />
            <span className="text-xl font-bold text-white">Target Compass</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={currentPage === 'home' ? 'text-accent-500' : 'text-gray-300 hover:text-accent-500 transition-colors'}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={currentPage === 'explore' ? 'text-accent-500' : 'text-gray-300 hover:text-accent-500 transition-colors'}
            >
              Explore
            </Link>
            <Link 
              to="/contact" 
              className={currentPage === 'contact' ? 'text-accent-500' : 'text-gray-300 hover:text-accent-500 transition-colors'}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session && (
              <>
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="flex items-center space-x-2 bg-primary-800 hover:bg-primary-700 text-accent-500 px-4 py-2 rounded-full transition-colors"
                >
                  <Medal className="w-5 h-5" />
                  <span className="font-medium">Leaderboard</span>
                </button>
                <button
                  onClick={() => navigate('/premium')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-primary-900 px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/20"
                >
                  <Crown className="w-5 h-5" />
                  <span className="font-medium">Premium</span>
                </button>
              </>
            )}
            
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 bg-primary-800 hover:bg-primary-700 px-4 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-accent-500" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{profile?.full_name || 'Loading...'}</p>
                    <p className="text-xs text-accent-500 truncate max-w-[150px]">{profile?.career_goal || ''}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-primary-800 rounded-xl shadow-lg border border-primary-700 py-1 z-50">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/profile');
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-primary-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleSignOut();
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-primary-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : onOpenAuth ? (
              <>
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="text-gray-300 hover:text-accent-500 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => onOpenAuth('register')}
                  className="bg-accent-500 text-primary-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent-400 transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <Link 
                to="/"
                className="text-gray-300 hover:text-accent-500 transition-colors"
              >
                Back to Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}