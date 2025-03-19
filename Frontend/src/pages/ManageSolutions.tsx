
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Layout from '../components/layout/Layout';
import SolutionForm from '../components/solutions/SolutionForm';
import { useContests } from '../hooks/useContests';
import { useSolutions } from '../hooks/useSolutions';
import { Solution, PlatformType } from '../types/contests';
import { formatDate } from '../utils/dateUtils';
import { Trash2, Youtube, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Page for managing contest solution links
 */
const ManageSolutions: React.FC = () => {
  // Get all contests without any filtering
  const { contests } = useContests({
    platforms: { codeforces: true, codechef: true, leetcode: true },
    showBookmarksOnly: false,
  });
  
  const { solutions, addSolution, removeSolution } = useSolutions();
  const [expandedSolutionId, setExpandedSolutionId] = useState<string | null>(null);
  
  const youtubePlaylistLinks = {
    leetcode: "https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
    codeforces: "https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB",
    codechef: "https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr"
  };
  
  const handleAddSolution = (solution: Solution) => {
    addSolution(solution);
  };
  
  const handleRemoveSolution = (solutionId: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the solution for "${title}"?`)) {
      removeSolution(solutionId);
      toast({
        title: "Solution removed",
        description: `Solution for "${title}" has been removed.`
      });
    }
  };
  
  const toggleSolution = (id: string) => {
    setExpandedSolutionId(expandedSolutionId === id ? null : id);
  };
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent pb-1">
            Manage Solutions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Add YouTube solution links to past contests
          </p>
        </div>
        
        <div className="glass-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Solution Playlists</h2>
          <div className="space-y-4">
            {Object.entries(youtubePlaylistLinks).map(([platform, link]) => (
              <div key={platform} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`platform-badge platform-badge-${platform} mr-3`}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </div>
                  <span>Official Solutions</span>
                </div>
                <a 
                  href={link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                >
                  View Playlist
                  <Youtube className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <Tabs defaultValue="add">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="add">Add Solution</TabsTrigger>
            <TabsTrigger value="manage">Manage Solutions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="animate-fade-in">
            <SolutionForm
              contests={contests}
              onAddSolution={handleAddSolution}
            />
          </TabsContent>
          
          <TabsContent value="manage" className="animate-fade-in">
            {solutions.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Existing Solutions</h2>
                
                {solutions.map((solution) => (
                  <div 
                    key={solution.contestId}
                    className="glass-card rounded-lg overflow-hidden animate-fade-in"
                  >
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSolution(solution.contestId)}
                    >
                      <div>
                        <div className={`platform-badge platform-badge-${solution.platform} mb-2`}>
                          {solution.platform.charAt(0).toUpperCase() + solution.platform.slice(1)}
                        </div>
                        <h3 className="font-medium">{solution.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Added on {formatDate(solution.dateAdded)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSolution(solution.contestId, solution.title);
                          }}
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    
                    {expandedSolutionId === solution.contestId && (
                      <div className="p-4 pt-0 border-t border-border mt-2 animate-slide-in">
                        <div className="flex items-center">
                          <Youtube className="w-5 h-5 text-red-500 mr-2" />
                          <a 
                            href={solution.youtubeLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline truncate"
                          >
                            {solution.youtubeLink}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No Solutions Added Yet</h3>
                <p className="text-muted-foreground">
                  Add your first contest solution using the form in the Add Solution tab.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManageSolutions;
