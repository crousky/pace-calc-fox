'use client';

import { useState } from 'react';

interface CalculationResult {
  pace: string;
  distance: string;
  time: string;
  calculatedField: 'pace' | 'distance' | 'time';
  timestamp: string;
}

export default function Home() {
  // Input states
  const [pace, setPace] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  // Unit states
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'miles'>('km');
  const [paceUnit, setPaceUnit] = useState<'min/km' | 'min/mile'>('min/km');

  // Results history
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [error, setError] = useState('');

  // Convert pace string (MM:SS) to seconds per unit
  const paceToSeconds = (paceStr: string): number => {
    const parts = paceStr.split(':');
    if (parts.length !== 2) return 0;
    const mins = parseInt(parts[0]) || 0;
    const secs = parseInt(parts[1]) || 0;
    return mins * 60 + secs;
  };

  // Convert seconds to pace string (MM:SS)
  const secondsToPace = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert time string (HH:MM:SS) to seconds
  const timeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      // MM:SS format
      const mins = parseInt(parts[0]) || 0;
      const secs = parseInt(parts[1]) || 0;
      return mins * 60 + secs;
    } else if (parts.length === 3) {
      // HH:MM:SS format
      const hours = parseInt(parts[0]) || 0;
      const mins = parseInt(parts[1]) || 0;
      const secs = parseInt(parts[2]) || 0;
      return hours * 3600 + mins * 60 + secs;
    }
    return 0;
  };

  // Convert seconds to time string (HH:MM:SS)
  const secondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCalculate = () => {
    setError('');

    // Count how many fields are filled
    const filledFields = [pace, distance, time].filter(field => field !== '').length;

    if (filledFields !== 2) {
      setError('Please fill in exactly 2 fields');
      return;
    }

    let calculatedField: 'pace' | 'distance' | 'time';
    let resultPace = pace;
    let resultDistance = distance;
    let resultTime = time;

    try {
      // Calculate missing field
      if (!pace) {
        // Calculate pace
        const distValue = parseFloat(distance);
        const timeValue = timeToSeconds(time);

        if (distValue <= 0 || timeValue <= 0) {
          setError('Distance and time must be greater than 0');
          return;
        }

        const paceInSeconds = timeValue / distValue;
        resultPace = secondsToPace(paceInSeconds);
        calculatedField = 'pace';
      } else if (!distance) {
        // Calculate distance
        const paceValue = paceToSeconds(pace);
        const timeValue = timeToSeconds(time);

        if (paceValue <= 0 || timeValue <= 0) {
          setError('Pace and time must be greater than 0');
          return;
        }

        const distValue = timeValue / paceValue;
        resultDistance = distValue.toFixed(2);
        calculatedField = 'distance';
      } else {
        // Calculate time
        const paceValue = paceToSeconds(pace);
        const distValue = parseFloat(distance);

        if (paceValue <= 0 || distValue <= 0) {
          setError('Pace and distance must be greater than 0');
          return;
        }

        const timeValue = paceValue * distValue;
        resultTime = secondsToTime(timeValue);
        calculatedField = 'time';
      }

      // Create result object
      const newResult: CalculationResult = {
        pace: `${resultPace} ${paceUnit}`,
        distance: `${resultDistance} ${distanceUnit}`,
        time: resultTime,
        calculatedField,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Update results (keep only last 5)
      setResults(prev => [newResult, ...prev].slice(0, 5));

      // Update the calculated field
      if (calculatedField === 'pace') {
        setPace(resultPace);
      } else if (calculatedField === 'distance') {
        setDistance(resultDistance);
      } else {
        setTime(resultTime);
      }
    } catch (err) {
      setError('Invalid input. Please check your values.');
    }
  };

  const handleClear = () => {
    setPace('');
    setDistance('');
    setTime('');
    setError('');
  };

  return (
    <div className="min-h-screen synthwave-grid scanlines p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 mt-8">
          <h1 className="text-5xl sm:text-7xl font-bold neon-glow mb-4">
            PACE CALC
          </h1>
          <p className="text-xl sm:text-2xl neon-blue-glow">
            Running Race Calculator
          </p>
        </header>

        {/* Calculator Card */}
        <div className="neon-box bg-dark-purple bg-opacity-80 backdrop-blur-sm rounded-lg p-6 sm:p-8 mb-8">
          <div className="space-y-6">
            {/* Pace Input */}
            <div>
              <label className="block text-lg mb-2 text-[var(--neon-purple)]">
                Pace (MM:SS)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  placeholder="5:30"
                  className="neon-input flex-1 px-4 py-3 rounded text-white text-lg"
                />
                <select
                  value={paceUnit}
                  onChange={(e) => setPaceUnit(e.target.value as 'min/km' | 'min/mile')}
                  className="neon-input px-4 py-3 rounded text-white"
                >
                  <option value="min/km">min/km</option>
                  <option value="min/mile">min/mile</option>
                </select>
              </div>
            </div>

            {/* Distance Input */}
            <div>
              <label className="block text-lg mb-2 text-[var(--neon-purple)]">
                Distance
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="42.195"
                  className="neon-input flex-1 px-4 py-3 rounded text-white text-lg"
                />
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value as 'km' | 'miles')}
                  className="neon-input px-4 py-3 rounded text-white"
                >
                  <option value="km">km</option>
                  <option value="miles">miles</option>
                </select>
              </div>
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-lg mb-2 text-[var(--neon-purple)]">
                Time (HH:MM:SS or MM:SS)
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="3:45:00"
                className="neon-input w-full px-4 py-3 rounded text-white text-lg"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-[var(--neon-pink)] text-center text-lg font-bold">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleCalculate}
                className="neon-button flex-1 px-6 py-4 rounded-lg text-white font-bold text-lg uppercase tracking-wider"
              >
                Calculate
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-4 rounded-lg border-2 border-[var(--neon-blue)] text-[var(--neon-blue)] font-bold text-lg uppercase tracking-wider hover:bg-[var(--neon-blue)] hover:bg-opacity-20 transition-all"
              >
                Clear
              </button>
            </div>

            {/* Instructions */}
            <div className="text-center text-sm text-[var(--neon-blue)] opacity-75 pt-2">
              Fill in any 2 fields and click Calculate to solve for the third
            </div>
          </div>
        </div>

        {/* Results History */}
        {results.length > 0 && (
          <div className="neon-box bg-dark-purple bg-opacity-80 backdrop-blur-sm rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--neon-yellow)] mb-6">
              RECENT CALCULATIONS
            </h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border-2 border-[var(--neon-purple)] rounded-lg p-4 bg-black bg-opacity-40"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center sm:text-left">
                    <div>
                      <div className="text-xs text-[var(--neon-blue)] uppercase mb-1">
                        Pace
                      </div>
                      <div className={`text-lg font-bold ${result.calculatedField === 'pace' ? 'text-[var(--neon-yellow)]' : 'text-white'}`}>
                        {result.pace}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--neon-blue)] uppercase mb-1">
                        Distance
                      </div>
                      <div className={`text-lg font-bold ${result.calculatedField === 'distance' ? 'text-[var(--neon-yellow)]' : 'text-white'}`}>
                        {result.distance}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--neon-blue)] uppercase mb-1">
                        Time
                      </div>
                      <div className={`text-lg font-bold ${result.calculatedField === 'time' ? 'text-[var(--neon-yellow)]' : 'text-white'}`}>
                        {result.time}
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-xs text-[var(--neon-purple)] uppercase mb-1">
                        Calculated
                      </div>
                      <div className="text-sm text-[var(--neon-pink)]">
                        {result.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-[var(--neon-purple)] opacity-75">
          <p>SYNTHWAVE RUNNER © 2025</p>
        </footer>
      </div>
    </div>
  );
}
