
import { Contest, ContestsByStatus, ContestStatus, FilterOptions, PlatformType } from '../types/contests';
import { getContestStatus } from './dateUtils';

/**
 * Filter contests based on selected platforms and bookmark status
 * @param contests - Array of all contests
 * @param filterOptions - Filter criteria
 * @returns Filtered array of contests
 */
export const filterContests = (
  contests: Contest[],
  filterOptions: FilterOptions
): Contest[] => {
  // Check if any platform is enabled
  const anyPlatformEnabled = Object.values(filterOptions.platforms).some(Boolean);
  
  // If no platforms are selected, return empty array
  if (!anyPlatformEnabled) {
    return [];
  }
  
  return contests.filter((contest) => {
    // Filter by platform
    const platformEnabled = filterOptions.platforms[contest.site];
    
    // Filter by bookmark status if the option is enabled
    const bookmarkMatch = filterOptions.showBookmarksOnly 
      ? contest.bookmarked 
      : true;
    
    return platformEnabled && bookmarkMatch;
  });
};

/**
 * Group contests by their status (upcoming, ongoing, past)
 * @param contests - Array of contests to group
 * @returns Object with contests grouped by status
 */
export const groupContestsByStatus = (
  contests: Contest[]
): ContestsByStatus => {
  const result: ContestsByStatus = {
    upcoming: [],
    ongoing: [],
    past: [],
  };
  
  contests.forEach((contest) => {
    const status = getContestStatus(contest.startTime, contest.endTime);
    result[status as ContestStatus].push(contest);
  });
  
  // Sort upcoming contests by start time (ascending)
  result.upcoming.sort((a, b) => a.startTime - b.startTime);
  
  // Sort ongoing contests by end time (ascending)
  result.ongoing.sort((a, b) => a.endTime - b.endTime);
  
  // Sort past contests by start time (descending - most recent first)
  result.past.sort((a, b) => b.startTime - a.startTime);
  
  return result;
};

/**
 * Generate a unique ID for a contest based on its properties
 * @param contest - Contest object
 * @returns Unique identifier string
 */
export const generateContestId = (contest: Contest): string => {
  return `${contest.site}-${contest.startTime}-${encodeURIComponent(contest.title)}`;
};
