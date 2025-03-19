import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BookmarkButtonProps {
  contestId: string;
  isBookmarked: boolean;
  className?: string;
  onToggle: () => void; // New prop
}

/**
 * Button component for bookmarking/unbookmarking contests
 */
const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  isBookmarked, 
  className, 
  onToggle
}) => {
  
  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(); // Call the function passed from ContestCard
  };
  
  return (
    <button
      onClick={handleToggleBookmark}
      className={cn(
        "transition-all duration-200 p-1.5 rounded-full",
        isBookmarked 
          ? "text-primary hover:text-primary/80" 
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this contest"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-5 h-5 animate-scale-in" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  );
};

export default BookmarkButton;
