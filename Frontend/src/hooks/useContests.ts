
import { useQuery } from '@tanstack/react-query';
import { Contest, ContestWithSolution, FilterOptions, PlatformType } from '../types/contests';
import { filterContests, generateContestId, groupContestsByStatus } from '../utils/filterUtils';
import { useSolutions } from './useSolutions';
import { useBookmarks } from './useBookmarks';

/**
 * Base URLs for the contest APIs
 */
const API_ENDPOINTS = {
  upcoming: 'https://competeapi.vercel.app/contests/upcoming',
  codeforces: 'https://competeapi.vercel.app/contests/codeforces',
  codechef: 'https://competeapi.vercel.app/contests/codechef',
  leetcode: 'https://competeapi.vercel.app/contests/leetcode',
};

/**
 * Fetch contests from a specific endpoint
 * @param endpoint - API endpoint URL
 * @returns Promise resolving to an array of contests
 */
const fetchContestsFromEndpoint = async (endpoint: string): Promise<Contest[]> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error fetching contests: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data.map(contest => ({
        ...contest,
        id: generateContestId(contest),
      }));
    } else if (data.data && Array.isArray(data.data)) {
      return data.data.map(contest => ({
        ...contest,
        id: generateContestId(contest),
      }));
    } else if (data.data && data.data.topTwoContests && Array.isArray(data.data.topTwoContests)) {
      // Handle Leetcode specific format
      return data.data.topTwoContests.map((contest: any) => ({
        site: 'leetcode' as PlatformType,
        title: contest.title,
        startTime: contest.startTime * 1000, // Convert to milliseconds
        duration: contest.duration * 1000, // Convert to milliseconds
        endTime: (contest.startTime + contest.duration) * 1000, // Calculate end time
        url: `https://leetcode.com/contest/${contest.title.toLowerCase().replace(/\s+/g, '-')}`,
        id: generateContestId({
          site: 'leetcode',
          title: contest.title,
          startTime: contest.startTime * 1000,
          duration: contest.duration * 1000,
          endTime: (contest.startTime + contest.duration) * 1000,
          url: `https://leetcode.com/contest/${contest.title.toLowerCase().replace(/\s+/g, '-')}`,
        }),
      }));
    }
    
    console.error('Unexpected API response format:', data);
    return [];
  } catch (error) {
    console.error('Error fetching contests:', error);
    return [];
  }
};

/**
 * Custom hook for fetching and managing contest data
 * @param filterOptions - Current filter settings
 * @returns Object containing contest data and loading state
 */
export const useContests = (filterOptions: FilterOptions) => {
  const { bookmarks, isBookmarked } = useBookmarks();
  const { solutions, getSolution } = useSolutions();
  
  // Fetch contests from all endpoints
  const { data: allContests = [], isLoading, error } = useQuery({
    queryKey: ['contests'],
    queryFn: async () => {
      try {
        const [upcomingContests] = await Promise.all([
          fetchContestsFromEndpoint(API_ENDPOINTS.upcoming),
          // We also fetch from individual endpoints for complete data
          // fetchContestsFromEndpoint(API_ENDPOINTS.codeforces),
          // fetchContestsFromEndpoint(API_ENDPOINTS.codechef),
          // fetchContestsFromEndpoint(API_ENDPOINTS.leetcode),
        ]);
        
        return upcomingContests;
      } catch (error) {
        console.error('Error fetching contests:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Apply bookmarks to contests
  const contestsWithBookmarks = allContests.map(contest => {
    // Make sure each contest has an ID
    const contestId = contest.id || '';
    
    return {
      ...contest,
      id: contestId, // Ensure ID is present
      bookmarked: isBookmarked(contestId),
    };
  });
  
  // Apply solutions to contests
  const contestsWithSolutions: ContestWithSolution[] = contestsWithBookmarks.map(contest => {
    const contestSolution = getSolution(contest.id || '');
    return {
      ...contest,
      solution: contestSolution,
    };
  });
  
  // Apply filters
  const filteredContests = filterContests(contestsWithSolutions, filterOptions);
  
  // Group by status
  const contestsByStatus = groupContestsByStatus(filteredContests);
  
  return {
    contests: contestsWithSolutions,
    contestsByStatus,
    isLoading,
    error,
  };
};
