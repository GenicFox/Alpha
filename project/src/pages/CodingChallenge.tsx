import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Clock, Star, Trophy, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface TestCase {
  input: string;
  expectedOutput: string;
  passed?: boolean;
}

function CodingChallenge() {
  const [code, setCode] = useState(`function solution(arr) {
  // Write your solution here
}`);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: '[1, 2, 3]', expectedOutput: '6' },
    { input: '[4, 5, 6]', expectedOutput: '15' },
    { input: '[-1, 0, 1]', expectedOutput: '0' }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestCases(prev => prev.map(testCase => ({
        ...testCase,
        passed: Math.random() > 0.5 // Simulated test results
      })));
      setIsRunning(false);
    }, 1500);
  };

  const passedTests = testCases.filter(test => test.passed).length;

  return (
    <div className="min-h-screen bg-primary-900 text-white">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-accent-500 hover:text-accent-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quests
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
              <h1 className="text-2xl font-bold mb-4">Array Sum Challenge</h1>
              <p className="text-gray-300 mb-6">
                Create a function that calculates the sum of all numbers in an array. 
                The function should handle both positive and negative numbers.
              </p>
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Requirements:</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Function should take an array of numbers as input</li>
                  <li>Return the sum of all numbers in the array</li>
                  <li>Handle empty arrays (return 0)</li>
                  <li>Handle arrays with negative numbers</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-800 rounded-xl border border-primary-700">
              <div className="border-b border-primary-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-accent-500" />
                    <h2 className="font-semibold">Code Editor</h2>
                  </div>
                  <button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    className="bg-accent-500 text-primary-900 px-4 py-2 rounded-lg font-semibold hover:bg-accent-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Tests</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 bg-primary-900 text-white font-mono p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-500"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Challenge Progress</h2>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">25:00</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completion</span>
                  <span className="text-accent-500">{Math.round((passedTests / testCases.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-primary-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-500 rounded-full transition-all duration-300"
                    style={{ width: `${(passedTests / testCases.length) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tests Passed</span>
                  <span className="text-accent-500">{passedTests}/{testCases.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
              <h2 className="text-lg font-semibold mb-4">Test Results</h2>
              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Test Case {index + 1}</span>
                      {testCase.passed !== undefined && (
                        <span className={testCase.passed ? 'text-green-400' : 'text-red-400'}>
                          {testCase.passed ? 'Passed' : 'Failed'}
                        </span>
                      )}
                    </div>
                    <div className="bg-primary-900 rounded-lg p-3 text-sm font-mono">
                      <div className="text-gray-400">Input: {testCase.input}</div>
                      <div className="text-gray-400">Expected: {testCase.expectedOutput}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-800 rounded-xl p-6 border border-primary-700">
              <h2 className="text-lg font-semibold mb-4">Rewards</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Experience Points</span>
                  </div>
                  <span className="text-yellow-400 font-semibold">50 XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Achievement</span>
                  </div>
                  <span className="text-purple-400 font-semibold">Problem Solver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CodingChallenge;