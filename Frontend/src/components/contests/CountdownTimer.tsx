
import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '../../utils/dateUtils';

interface CountdownTimerProps {
  targetTime: number;
  onComplete?: () => void;
}

/**
 * Countdown timer component showing time remaining until a specific timestamp
 */
const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetTime));
  
  useEffect(() => {
    // Update the countdown every second
    const interval = setInterval(() => {
      const newTimeRemaining = getTimeRemaining(targetTime);
      setTimeRemaining(newTimeRemaining);
      
      // Check if countdown is complete
      if (newTimeRemaining.total <= 0 && onComplete) {
        onComplete();
        clearInterval(interval);
      }
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [targetTime, onComplete]);
  
  // Display zeros if countdown is complete
  if (timeRemaining.total <= 0) {
    return (
      <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
        <span>Starting now</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2 text-sm font-medium">
      <div className="grid grid-flow-col gap-1 text-center auto-cols-max">
        {timeRemaining.days > 0 && (
          <div className="flex flex-col p-1">
            <span className="text-foreground font-mono">{timeRemaining.days.toString().padStart(2, '0')}</span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
        )}
        
        <div className="flex flex-col p-1">
          <span className="text-foreground font-mono">{timeRemaining.hours.toString().padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground">hrs</span>
        </div>
        
        <div className="flex flex-col p-1">
          <span className="text-foreground font-mono">{timeRemaining.minutes.toString().padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground">min</span>
        </div>
        
        <div className="flex flex-col p-1">
          <span className="text-foreground font-mono">{timeRemaining.seconds.toString().padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground">sec</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
