
/**
 * Utility functions for date formatting and calculations
 */

/**
 * Format a timestamp into a readable date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format a duration from milliseconds to hours and minutes
 * @param durationMs - Duration in milliseconds
 * @returns Formatted duration string
 */
export const formatDuration = (durationMs: number): string => {
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  
  if (minutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
};

/**
 * Calculate time remaining from now until a future timestamp
 * @param targetTimestamp - Target timestamp in the future (milliseconds)
 * @returns Object containing days, hours, minutes, seconds remaining
 */
export const getTimeRemaining = (targetTimestamp: number) => {
  const now = Date.now();
  const difference = targetTimestamp - now;
  
  // If the target time is in the past, return zeros
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    total: difference,
  };
};

/**
 * Determine if a contest is upcoming, ongoing, or past
 * @param startTime - Contest start time in milliseconds
 * @param endTime - Contest end time in milliseconds
 * @returns Contest status
 */
export const getContestStatus = (startTime: number, endTime: number) => {
  const now = Date.now();
  
  if (now < startTime) {
    return 'upcoming';
  }
  
  if (now >= startTime && now <= endTime) {
    return 'ongoing';
  }
  
  return 'past';
};
