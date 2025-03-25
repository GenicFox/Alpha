import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Brain, ChevronRight, CheckCircle, ArrowLeft, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function StudySession() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const topics = [
    {
      name: 'Frontend Development',
      description: 'Learn modern frontend frameworks and responsive design',
      icon: BookOpen,
    },
    {
      name: 'Data Structures',
      description: 'Master fundamental data structures and algorithms',
      icon: Brain,
    },
    {
      name: 'System Design',
      description: 'Understand scalable system architecture patterns',
      icon: ChevronRight,
    },
  ];

  const handleStart = () => {
    if (!selectedTopic) {
      alert('Please select a topic first');
      return;
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(30 * 60);
    setIsRunning(false);
  };

  const progress = ((30 * 60 - timeLeft) / (30 * 60)) * 100;

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-primary-800 rounded-xl p-8 border border-primary-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-accent-500" />
                <h1 className="text-2xl font-bold">Study Session</h1>
              </div>
              <div className="text-accent-500 font-semibold">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="relative h-4 bg-primary-900 rounded-full overflow-hidden mb-8">
              <div 
                className="absolute h-full bg-accent-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-center space-x-4">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex items-center space-x-2 bg-accent-500 text-primary-900 px-6 py-2 rounded-lg font-semibold hover:bg-accent-400 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Session</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center space-x-2 bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-primary-800 rounded-xl p-8 border border-primary-700">
            <h2 className="text-xl font-bold mb-6">Select Study Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => setSelectedTopic(topic.name)}
                  className={`p-6 rounded-xl border transition-all ${
                    selectedTopic === topic.name
                      ? 'bg-accent-500/10 border-accent-500'
                      : 'bg-primary-900/50 border-primary-700 hover:border-accent-500'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-primary-900/50 rounded-lg">
                      <topic.icon className="w-5 h-5 text-accent-500" />
                    </div>
                    <h3 className="font-semibold">{topic.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{topic.description}</p>
                  {selectedTopic === topic.name && (
                    <div className="flex items-center space-x-2 mt-4 text-accent-500">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudySession;