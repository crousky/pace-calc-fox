export interface CalculationResult {
  pace?: string;
  distance?: string;
  time?: string;
  timestamp: number;
}

// Convert time string (HH:MM:SS or MM:SS) to total seconds
export function timeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':').map(p => parseInt(p, 10));
  if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

// Convert seconds to time string (HH:MM:SS)
export function secondsToTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// Convert pace string (MM:SS per km/mile) to seconds per unit
export function paceToSeconds(paceStr: string): number {
  return timeToSeconds(paceStr);
}

// Convert seconds per unit to pace string (MM:SS)
export function secondsToPace(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

export interface CalculatorInputs {
  pace?: string;
  distance?: string;
  time?: string;
  distanceUnit: 'km' | 'mi';
}

export function calculateMissing(inputs: CalculatorInputs): CalculationResult | null {
  const { pace, distance, time, distanceUnit } = inputs;

  // Count how many inputs are provided
  const providedCount = [pace, distance, time].filter(v => v && v.trim() !== '').length;

  if (providedCount !== 2) {
    return null;
  }

  const result: CalculationResult = {
    timestamp: Date.now(),
  };

  // Calculate missing value
  if (!pace && distance && time) {
    // Calculate pace from distance and time
    const distanceNum = parseFloat(distance);
    const timeSeconds = timeToSeconds(time);
    const paceSeconds = timeSeconds / distanceNum;
    result.pace = `${secondsToPace(paceSeconds)} per ${distanceUnit}`;
    result.distance = `${distance} ${distanceUnit}`;
    result.time = time;
  } else if (!distance && pace && time) {
    // Calculate distance from pace and time
    const paceSeconds = paceToSeconds(pace);
    const timeSeconds = timeToSeconds(time);
    const distanceNum = timeSeconds / paceSeconds;
    result.distance = `${distanceNum.toFixed(2)} ${distanceUnit}`;
    result.pace = `${pace} per ${distanceUnit}`;
    result.time = time;
  } else if (!time && pace && distance) {
    // Calculate time from pace and distance
    const paceSeconds = paceToSeconds(pace);
    const distanceNum = parseFloat(distance);
    const totalSeconds = paceSeconds * distanceNum;
    result.time = secondsToTime(totalSeconds);
    result.pace = `${pace} per ${distanceUnit}`;
    result.distance = `${distance} ${distanceUnit}`;
  }

  return result;
}
