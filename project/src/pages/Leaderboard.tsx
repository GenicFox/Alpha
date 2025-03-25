import React, { useState, useMemo } from 'react';
import { Trophy, Medal, Star, Crown, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react';
import Header from '../components/Header';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  change: 'up' | 'down' | 'same';
  avatar: string;
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const changeColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    same: 'text-gray-400'
  };

  const ChangeIcon = {
    up: ArrowUp,
    down: ArrowDown,
    same: () => null
  }[entry.change];

  return (
    <div className="flex items-center space-x-4 bg-primary-800 p-4 rounded-lg border border-primary-700">
      <div className="flex items-center justify-center w-8">
        {entry.rank <= 3 ? (
          <Crown className={`w-6 h-6 ${
            entry.rank === 1 ? 'text-yellow-400' :
            entry.rank === 2 ? 'text-gray-400' :
            'text-orange-400'
          }`} />
        ) : (
          <span className="text-gray-400 font-medium">{entry.rank}</span>
        )}
      </div>
      
      <div className="flex items-center flex-grow">
        <img
          src={entry.avatar}
          alt={entry.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-white">{entry.name}</h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-accent-500">Level {entry.level}</span>
            <span className="text-gray-400">•</span>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 mr-1" />
              {entry.xp.toLocaleString()} XP
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-center">
          <div className="text-sm text-gray-400">Streak</div>
          <div className="font-semibold text-orange-400">{entry.streak} days</div>
        </div>
        <div className={`flex items-center ${changeColor[entry.change]}`}>
          <ChangeIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  // Different data sets for each timeframe
  const leaderboardDataSets = {
    daily: [
      {
        rank: 1,
        name: "Alex Thompson",
        xp: 2420,
        level: 42,
        streak: 15,
        change: 'same' as const,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 2,
        name: "Sarah Chen",
        xp: 2150,
        level: 39,
        streak: 12,
        change: 'up' as const,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 3,
        name: "Michael Rodriguez",
        xp: 1890,
        level: 37,
        streak: 8,
        change: 'down' as const,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 4,
        name: "Emily Parker",
        xp: 1650,
        level: 35,
        streak: 10,
        change: 'up' as const,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 5,
        name: "David Kim",
        xp: 1500,
        level: 34,
        streak: 7,
        change: 'down' as const,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
      }
    ],
    weekly: [
      {
        rank: 1,
        name: "Alex Thompson",
        xp: 15420,
        level: 42,
        streak: 15,
        change: 'same' as const,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 2,
        name: "Sarah Chen",
        xp: 14850,
        level: 39,
        streak: 12,
        change: 'up' as const,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 3,
        name: "Michael Rodriguez",
        xp: 14200,
        level: 37,
        streak: 8,
        change: 'down' as const,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 4,
        name: "Emily Parker",
        xp: 13800,
        level: 35,
        streak: 10,
        change: 'up' as const,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 5,
        name: "David Kim",
        xp: 13500,
        level: 34,
        streak: 7,
        change: 'down' as const,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
      }
    ],
    monthly: [
      {
        rank: 1,
        name: "Alex Thompson",
        xp: 52420,
        level: 42,
        streak: 15,
        change: 'same' as const,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 2,
        name: "Sarah Chen",
        xp: 48850,
        level: 39,
        streak: 12,
        change: 'up' as const,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 3,
        name: "Michael Rodriguez",
        xp: 45200,
        level: 37,
        streak: 8,
        change: 'down' as const,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 4,
        name: "Emily Parker",
        xp: 42800,
        level: 35,
        streak: 10,
        change: 'up' as const,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
      },
      {
        rank: 5,
        name: "David Kim",
        xp: 41500,
        level: 34,
        streak: 7,
        change: 'down' as const,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
      }
    ]
  };

  // Filter data based on search query
  const filteredData = useMemo(() => {
    const data = leaderboardDataSets[timeframe];
    if (!searchQuery) return data;
    
    return data.filter(entry =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [timeframe, searchQuery]);

  // Get stats based on timeframe
  const timeframeStats = {
    daily: { rank: 15, xp: 1240, achievements: 2 },
    weekly: { rank: 42, xp: 8240, achievements: 12 },
    monthly: { rank: 38, xp: 35420, achievements: 28 }
  };

  const currentStats = timeframeStats[timeframe];

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold">Leaderboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTimeframe('daily')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  timeframe === 'daily'
                    ? 'bg-accent-500 text-primary-900'
                    : 'text-gray-400 hover:text-accent-500'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeframe('weekly')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  timeframe === 'weekly'
                    ? 'bg-accent-500 text-primary-900'
                    : 'text-gray-400 hover:text-accent-500'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  timeframe === 'monthly'
                    ? 'bg-accent-500 text-primary-900'
                    : 'text-gray-400 hover:text-accent-500'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="bg-primary-800/50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold">Your Rank</h3>
                </div>
                <p className="text-2xl font-bold text-accent-500">#{currentStats.rank}</p>
              </div>
              <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold">Total XP</h3>
                </div>
                <p className="text-2xl font-bold text-accent-500">{currentStats.xp.toLocaleString()}</p>
              </div>
              <div className="bg-primary-800 rounded-lg p-4 border border-primary-700">
                <div className="flex items-center space-x-2 mb-2">
                  <Medal className="w-5 h-5 text-orange-400" />
                  <h3 className="font-semibold">Achievements</h3>
                </div>
                <p className="text-2xl font-bold text-accent-500">{currentStats.achievements}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-800 border border-primary-700 rounded-lg hover:border-accent-500 transition-colors">
              <Filter className="w-5 h-5 text-accent-500" />
              <span>Filter</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredData.map((entry) => (
              <LeaderboardRow key={entry.rank} entry={entry} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;