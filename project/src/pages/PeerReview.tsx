import React, { useState } from 'react';
import { ArrowLeft, Code, MessageSquare, ThumbsUp, ThumbsDown, Clock, User, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface Review {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  language: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  submittedAt: string;
  status: 'pending' | 'reviewed';
  codeSnippet: string;
}

function PeerReview() {
  const [activeTab, setActiveTab] = useState<'pending' | 'reviewed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const reviews: Review[] = [
    {
      id: 1,
      title: "Array Sum Implementation",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
      },
      language: "JavaScript",
      difficulty: "Easy",
      submittedAt: "2025-03-25T10:30:00",
      status: "pending",
      codeSnippet: `function arraySum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}`
    },
    {
      id: 2,
      title: "Binary Search Tree Implementation",
      author: {
        name: "Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
      },
      language: "Python",
      difficulty: "Medium",
      submittedAt: "2025-03-25T09:15:00",
      status: "pending",
      codeSnippet: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None`
    },
    {
      id: 3,
      title: "Quick Sort Algorithm",
      author: {
        name: "Emily Parker",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
      },
      language: "TypeScript",
      difficulty: "Hard",
      submittedAt: "2025-03-24T16:45:00",
      status: "reviewed",
      codeSnippet: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.filter((x, i) => i > 0 && x <= pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`
    }
  ];

  const filteredReviews = reviews.filter(review => 
    review.status === activeTab &&
    (review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     review.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const difficultyColors = {
    'Easy': 'text-green-400',
    'Medium': 'text-yellow-400',
    'Hard': 'text-red-400'
  };

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

          <div className="bg-primary-800 rounded-xl p-8 border border-primary-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-2">Peer Reviews</h1>
                <p className="text-gray-400">Review and provide feedback on code submissions</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-primary-900/50 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <span className="text-gray-400">Response time: ~2 hours</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-primary-900/50 border border-primary-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-900/50 border border-primary-700 rounded-lg hover:border-accent-500 transition-colors">
                <Filter className="w-5 h-5 text-accent-500" />
                <span>Filter</span>
              </button>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-accent-500 text-primary-900'
                    : 'text-gray-400 hover:text-accent-500'
                }`}
              >
                Pending Reviews
              </button>
              <button
                onClick={() => setActiveTab('reviewed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'reviewed'
                    ? 'bg-accent-500 text-primary-900'
                    : 'text-gray-400 hover:text-accent-500'
                }`}
              >
                Reviewed
              </button>
            </div>

            <div className="space-y-4">
              {filteredReviews.map(review => (
                <div 
                  key={review.id}
                  className="bg-primary-900/50 rounded-xl p-6 border border-primary-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={review.author.avatar}
                        alt={review.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{review.title}</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">{review.author.name}</span>
                          <span className="text-gray-600">•</span>
                          <span className={difficultyColors[review.difficulty]}>
                            {review.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(review.submittedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-primary-900 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">{review.codeSnippet}</pre>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-accent-500" />
                      <span className="text-gray-400">{review.language}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                        <span>Request Changes</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PeerReview;