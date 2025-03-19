
import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Loader } from 'lucide-react';
import Layout from '../components/layout/Layout';
import FilterBar from '../components/contests/FilterBar';
import ContestCard from '../components/contests/ContestCard';
import { useContests } from '../hooks/useContests';
import { FilterOptions, PlatformType } from '../types/contests';
import { cn } from '@/lib/utils';

/**
 * Main page displaying upcoming and past contests
 */
const Index: React.FC = () => {
  // Initialize filter options
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    platforms: {
      codeforces: true,
      codechef: true,
      leetcode: true,
    },
    showBookmarksOnly: false,
  });
  
  // Control section visibility
  const [expandedSections, setExpandedSections] = useState({
    ongoing: true,
    upcoming: true,
    past: false,
  });
  
  // Fetch contests data with the current filters
  const { contestsByStatus, isLoading, error } = useContests(filterOptions);
  
  // Toggle section expanded state
  const toggleSection = (section: 'ongoing' | 'upcoming' | 'past') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">
  Coding Contest Tracker
</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with upcoming contests from Codeforces, CodeChef, and LeetCode
          </p>
        </div>
        
        <FilterBar
          filterOptions={filterOptions}
          onFilterChange={setFilterOptions}
        />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="glass-card rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Error Loading Contests</h3>
            <p className="text-muted-foreground">
              There was a problem fetching the contest data. Please try again later.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Ongoing Contests Section */}
            {contestsByStatus.ongoing.length > 0 && (
              <section>
                <div 
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => toggleSection('ongoing')}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-platforms-codeforces mr-2 animate-ping-slow"></div>
                    <h2 className="text-xl font-medium">
                      Ongoing Contests ({contestsByStatus.ongoing.length})
                    </h2>
                  </div>
                  <button className="p-1">
                    {expandedSections.ongoing ? (
                      <ArrowUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ArrowDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                
                {expandedSections.ongoing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in">
                    {contestsByStatus.ongoing.map(contest => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                )}
              </section>
            )}
            
            {/* Upcoming Contests Section */}
            <section>
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => toggleSection('upcoming')}
              >
                <h2 className="text-xl font-medium">
                  Upcoming Contests ({contestsByStatus.upcoming.length})
                </h2>
                <button className="p-1">
                  {expandedSections.upcoming ? (
                    <ArrowUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              
              {expandedSections.upcoming && (
                contestsByStatus.upcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in">
                    {contestsByStatus.upcoming.map(contest => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-8 text-center animate-fade-in">
                    <p className="text-muted-foreground">
                      No upcoming contests match your filter criteria.
                    </p>
                  </div>
                )
              )}
            </section>
            
            {/* Past Contests Section */}
            <section>
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer"
                onClick={() => toggleSection('past')}
              >
                <h2 className="text-xl font-medium">
                  Past Contests ({contestsByStatus.past.length})
                </h2>
                <button className="p-1">
                  {expandedSections.past ? (
                    <ArrowUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ArrowDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              
              {expandedSections.past && (
                contestsByStatus.past.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in">
                    {contestsByStatus.past.map(contest => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card rounded-lg p-8 text-center animate-fade-in">
                    <p className="text-muted-foreground">
                      No past contests match your filter criteria.
                    </p>
                  </div>
                )
              )}
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
