'use client';

import { useState } from 'react';
import { calculateMissing, type CalculationResult } from './utils/calculator';

export default function Home() {
  const [pace, setPace] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>('km');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');

    // Count non-empty inputs
    const inputs = [pace, distance, time].filter(v => v && v.trim() !== '');

    if (inputs.length !== 2) {
      setError('Please provide exactly 2 values to calculate the third');
      return;
    }

    const result = calculateMissing({
      pace: pace || undefined,
      distance: distance || undefined,
      time: time || undefined,
      distanceUnit,
    });

    if (result) {
      // Add to results, keep only last 5
      setResults(prev => [result, ...prev].slice(0, 5));

      // Update the empty field with calculated value
      if (!pace && result.pace) {
        const paceValue = result.pace.replace(` per ${distanceUnit}`, '');
        setPace(paceValue);
      }
      if (!distance && result.distance) {
        const distanceValue = result.distance.replace(` ${distanceUnit}`, '');
        setDistance(distanceValue);
      }
      if (!time && result.time) {
        setTime(result.time);
      }
    } else {
      setError('Unable to calculate. Please check your inputs.');
    }
  };

  const handleClear = () => {
    setPace('');
    setDistance('');
    setTime('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Running Pace Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter any 2 values to calculate the third
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            {/* Distance Unit Toggle */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={() => setDistanceUnit('km')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    distanceUnit === 'km'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Kilometers
                </button>
                <button
                  onClick={() => setDistanceUnit('mi')}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    distanceUnit === 'mi'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Miles
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pace Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pace (MM:SS per {distanceUnit})
                </label>
                <input
                  type="text"
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  placeholder="5:30"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>

              {/* Distance Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distance ({distanceUnit})
                </label>
                <input
                  type="text"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="42.195"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time (HH:MM:SS or MM:SS)
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="3:45:00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Calculate
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results History */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Calculations
            </h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.timestamp}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border border-blue-100 dark:border-gray-600"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Pace
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.pace}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Distance
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.distance}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Time
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
