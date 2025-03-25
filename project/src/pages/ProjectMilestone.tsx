import React, { useState } from 'react';
import { ArrowLeft, Code, Layout, Database, CheckCircle2, GitBranch, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'blocked';
  dueDate: string;
}

function ProjectMilestone() {
  const [tasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement User Authentication",
      description: "Set up JWT-based authentication with refresh tokens",
      status: "completed",
      dueDate: "2025-03-28"
    },
    {
      id: 2,
      title: "Create Dashboard Layout",
      description: "Design and implement responsive dashboard with Tailwind CSS",
      status: "in-progress",
      dueDate: "2025-03-29"
    },
    {
      id: 3,
      title: "Set Up Database Schema",
      description: "Design and implement initial database schema with migrations",
      status: "in-progress",
      dueDate: "2025-03-30"
    },
    {
      id: 4,
      title: "API Integration",
      description: "Integrate backend APIs with frontend components",
      status: "blocked",
      dueDate: "2025-03-31"
    }
  ]);

  const statusColors = {
    'completed': 'bg-green-500/10 text-green-500 border-green-500/20',
    'in-progress': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'blocked': 'bg-red-500/10 text-red-500 border-red-500/20'
  };

  const statusIcons = {
    'completed': CheckCircle2,
    'in-progress': Clock,
    'blocked': AlertCircle
  };

  const getStatusText = (status: Task['status']) => {
    return {
      'completed': 'Completed',
      'in-progress': 'In Progress',
      'blocked': 'Blocked'
    }[status];
  };

  const calculateProgress = () => {
    const completed = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completed / tasks.length) * 100);
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

          <div className="bg-primary-800 rounded-xl p-8 border border-primary-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Project Milestone</h1>
                <p className="text-gray-400">Track your project's progress and upcoming tasks</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-500 mb-1">{calculateProgress()}%</div>
                <div className="text-sm text-gray-400">Overall Progress</div>
              </div>
            </div>

            <div className="h-2 bg-primary-900 rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-accent-500 transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-primary-900/50 rounded-xl p-6 border border-primary-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Code className="w-5 h-5 text-accent-500" />
                  <h3 className="font-semibold">Features</h3>
                </div>
                <p className="text-2xl font-bold text-accent-500">4/8</p>
              </div>
              <div className="bg-primary-900/50 rounded-xl p-6 border border-primary-700">
                <div className="flex items-center space-x-3 mb-2">
                  <GitBranch className="w-5 h-5 text-accent-500" />
                  <h3 className="font-semibold">Commits</h3>
                </div>
                <p className="text-2xl font-bold text-accent-500">24</p>
              </div>
              <div className="bg-primary-900/50 rounded-xl p-6 border border-primary-700">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <h3 className="font-semibold">Time Spent</h3>
                </div>
                <p className="text-2xl font-bold text-accent-500">12h 30m</p>
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map(task => {
                const StatusIcon = statusIcons[task.status];
                return (
                  <div 
                    key={task.id}
                    className="bg-primary-900/50 rounded-xl p-6 border border-primary-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                        <p className="text-gray-400 mb-4">{task.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm border ${statusColors[task.status]}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span>{getStatusText(task.status)}</span>
                          </span>
                          <span className="text-sm text-gray-400">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button className="text-accent-500 hover:text-accent-400 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectMilestone;