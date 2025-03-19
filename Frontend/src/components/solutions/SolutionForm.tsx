
import React, { useState } from 'react';
import { ContestWithSolution, PlatformType, Solution } from '../../types/contests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface SolutionFormProps {
  contests: ContestWithSolution[];
  onAddSolution: (solution: Solution) => void;
}

/**
 * Form for adding YouTube solution links to contests
 */
const SolutionForm: React.FC<SolutionFormProps> = ({ contests, onAddSolution }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | ''>('');
  const [selectedContestId, setSelectedContestId] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter contests by platform
  const filteredContests = contests.filter(contest => 
    selectedPlatform ? contest.site === selectedPlatform : true
  );
  
  // Extract contest details for the selected contest
  const selectedContest = contests.find(c => c.id === selectedContestId);
  
  // Validate YouTube link format
  const isValidYoutubeLink = () => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(youtubeLink);
  };
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedContestId) {
      toast({
        title: "Please select a contest",
        variant: "destructive",
      });
      return;
    }
    
    if (!youtubeLink) {
      toast({
        title: "Please enter a YouTube link",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidYoutubeLink()) {
      toast({
        title: "Please enter a valid YouTube link",
        description: "The link must be from youtube.com or youtu.be",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedContest) {
      toast({
        title: "Invalid contest selected",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create and add solution
    const solution: Solution = {
      contestId: selectedContestId,
      platform: selectedContest.site,
      title: selectedContest.title,
      youtubeLink,
      dateAdded: Date.now(),
    };
    
    onAddSolution(solution);
    
    // Reset form
    setSelectedPlatform('');
    setSelectedContestId('');
    setYoutubeLink('');
    setIsSubmitting(false);
    
    toast({
      title: "Solution added successfully",
      description: `Solution for "${selectedContest.title}" has been added.`,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Add Solution Link</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="platform" className="text-sm font-medium">
            Platform
          </label>
          <Select
            value={selectedPlatform}
            onValueChange={(value) => {
              setSelectedPlatform(value as PlatformType);
              setSelectedContestId('');
            }}
          >
            <SelectTrigger id="platform">
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="codeforces">Codeforces</SelectItem>
              <SelectItem value="codechef">CodeChef</SelectItem>
              <SelectItem value="leetcode">LeetCode</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contest" className="text-sm font-medium">
            Contest
          </label>
          <Select
            value={selectedContestId}
            onValueChange={setSelectedContestId}
            disabled={filteredContests.length === 0}
          >
            <SelectTrigger id="contest">
              <SelectValue placeholder={
                filteredContests.length === 0 
                  ? "No contests available" 
                  : "Select a contest"
              } />
            </SelectTrigger>
            <SelectContent>
              {filteredContests.map(contest => (
                <SelectItem key={contest.id} value={contest.id || ''}>
                  {contest.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="youtubeLink" className="text-sm font-medium">
            YouTube Link
          </label>
          <Input
            id="youtubeLink"
            placeholder="https://youtube.com/..."
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !selectedContestId || !youtubeLink}
      >
        {isSubmitting ? "Adding Solution..." : "Add Solution"}
      </Button>
    </form>
  );
};

export default SolutionForm;
