
export interface Contest {
  site: PlatformType;
  title: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
  id?: string; // For uniquely identifying contests
  bookmarked?: boolean; // To track if a contest is bookmarked
}

export type PlatformType = 'codeforces' | 'codechef' | 'leetcode';

export interface Solution {
  contestId: string;
  platform: PlatformType;
  title: string;
  youtubeLink: string;
  dateAdded: number;
}

export interface ContestWithSolution extends Contest {
  solution?: Solution;
}

export interface FilterOptions {
  platforms: Record<PlatformType, boolean>;
  showBookmarksOnly: boolean;
}

export enum ContestStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  PAST = 'past'
}

export interface ContestsByStatus {
  upcoming: ContestWithSolution[];
  ongoing: ContestWithSolution[];
  past: ContestWithSolution[];
}
