import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

/**
 * Custom hook for managing bookmarked contests
 * @returns Object containing bookmark functions and state
 */
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('contestBookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error parsing bookmarks from localStorage:', error);
        setBookmarks([]);
      }
    }
  }, []);

  // Update localStorage when bookmarks change
  useEffect(() => {
    localStorage.setItem('contestBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  /**
   * Toggle a contest's bookmark status
   * @param contestId - The ID of the contest to toggle
   */
  const toggleBookmark = (contestId: string): void => {
    setBookmarks(prevBookmarks => {
      let updatedBookmarks;
      if (prevBookmarks.includes(contestId)) {
        toast({
          title: "Removed from bookmarks",
          description: "Contest removed from your bookmarks list",
        });
        updatedBookmarks = prevBookmarks.filter(id => id !== contestId);
      } else {
        toast({
          title: "Added to bookmarks",
          description: "Contest added to your bookmarks list",
        });
        updatedBookmarks = [...prevBookmarks, contestId];
      }
      
      // Save updated bookmarks to localStorage
      localStorage.setItem('contestBookmarks', JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  /**
   * Check if a contest is bookmarked
   * @param contestId - The ID of the contest to check
   * @returns True if the contest is bookmarked
   */
  const isBookmarked = (contestId: string): boolean => {
    return bookmarks.includes(contestId);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };
};
