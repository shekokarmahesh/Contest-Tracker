
import React from 'react';
import { Bookmark, Filter, CheckCircle } from 'lucide-react';
import { FilterOptions, PlatformType } from '../../types/contests';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filterOptions: FilterOptions;
  onFilterChange: (newOptions: FilterOptions) => void;
}

/**
 * Component for filtering contest listings
 */
const FilterBar: React.FC<FilterBarProps> = ({ filterOptions, onFilterChange }) => {
  // Toggle a specific platform filter
  const togglePlatform = (platform: PlatformType) => {
    onFilterChange({
      ...filterOptions,
      platforms: {
        ...filterOptions.platforms,
        [platform]: !filterOptions.platforms[platform],
      },
    });
  };
  
  // Toggle bookmark-only filter
  const toggleBookmarksOnly = () => {
    onFilterChange({
      ...filterOptions,
      showBookmarksOnly: !filterOptions.showBookmarksOnly,
    });
  };
  
  // Select all platforms
  const selectAllPlatforms = () => {
    onFilterChange({
      ...filterOptions,
      platforms: {
        codeforces: true,
        codechef: true,
        leetcode: true,
      },
    });
  };
  
  // Count enabled platforms
  const enabledPlatformsCount = Object.values(filterOptions.platforms).filter(Boolean).length;
  const allPlatformsSelected = enabledPlatformsCount === 3;
  
  return (
    <div className="glass-card rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Filter Contests</h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 px-3 text-xs border",
              allPlatformsSelected
                ? "bg-primary/10 text-primary border-primary/30"
                : "text-muted-foreground border-muted"
            )}
            onClick={selectAllPlatforms}
          >
            <CheckCircle className={cn("w-3.5 h-3.5 mr-1", !allPlatformsSelected && "opacity-0")} />
            All
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 px-3 text-xs border",
              filterOptions.platforms.codeforces 
                ? "bg-platforms-codeforces/10 text-platforms-codeforces border-platforms-codeforces/30"
                : "text-muted-foreground border-muted"
            )}
            onClick={() => togglePlatform('codeforces')}
          >
            Codeforces
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 px-3 text-xs border",
              filterOptions.platforms.codechef 
                ? "bg-platforms-codechef/10 text-platforms-codechef border-platforms-codechef/30"
                : "text-muted-foreground border-muted"
            )}
            onClick={() => togglePlatform('codechef')}
          >
            CodeChef
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 px-3 text-xs border",
              filterOptions.platforms.leetcode 
                ? "bg-platforms-leetcode/10 text-platforms-leetcode border-platforms-leetcode/30"
                : "text-muted-foreground border-muted"
            )}
            onClick={() => togglePlatform('leetcode')}
          >
            LeetCode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
