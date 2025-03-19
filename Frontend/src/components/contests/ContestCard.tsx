import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, Youtube } from 'lucide-react';
import { ContestWithSolution } from '../../types/contests';
import { formatDate, formatDuration, getContestStatus } from '../../utils/dateUtils';
import BookmarkButton from './BookmarkButton';
import CountdownTimer from './CountdownTimer';
import { cn } from '../../lib/utils';
import { useBookmarks } from '../../hooks/useBookmarks';

interface ContestCardProps {
  contest: ContestWithSolution;
}

/**
 * Card component displaying information about a coding contest
 */
const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const { 
    id = '', // Provide a default value to avoid null/undefined
    site, 
    title, 
    startTime, 
    duration, 
    endTime, 
    url,
    solution
  } = contest;
  
  const { isBookmarked, toggleBookmark, bookmarks } = useBookmarks();
  
  // Local state to sync with bookmarks
  const [bookmarked, setBookmarked] = useState(isBookmarked(id));

  // Sync state when bookmarks change
  useEffect(() => {
    setBookmarked(isBookmarked(id));
  }, [bookmarks, id]); 

  const status = getContestStatus(startTime, endTime);
  const isPast = status === 'past';
  const isOngoing = status === 'ongoing';
  
  const statusClasses = {
    upcoming: "border-l-4 border-l-primary",
    ongoing: "border-l-4 border-l-platforms-codeforces animate-pulse",
    past: "border-l-4 border-l-muted opacity-90",
  };
  
  return (
    <div 
      className={cn(
        "glass-card rounded-lg overflow-hidden card-hover", 
        statusClasses[status as keyof typeof statusClasses]
      )}
    >
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1.5">
            <div className={`platform-badge platform-badge-${site}`}>
              {site.charAt(0).toUpperCase() + site.slice(1)}
            </div>
            <h3 className="text-lg font-medium text-balance line-clamp-2">{title}</h3>
          </div>
          
          <BookmarkButton 
            contestId={id} 
            isBookmarked={bookmarked} 
            onToggle={() => toggleBookmark(id)} // Pass a callback to force update
          />
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{formatDate(startTime)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Duration:</span>
            <span>{formatDuration(duration)}</span>
          </div>
          
          {!isPast && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-1">
                {isOngoing ? "Ends in:" : "Starts in:"}
              </p>
              <CountdownTimer targetTime={isOngoing ? endTime : startTime} />
            </div>
          )}
          
          <div className="flex items-center mt-4 justify-between">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
            >
              Visit Contest
              <ExternalLink className="ml-1 w-3.5 h-3.5" />
            </a>
            
            {solution && (
              <a 
                href={solution.youtubeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Solution
                <Youtube className="ml-1 w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
