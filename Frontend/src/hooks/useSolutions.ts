
import { useState, useEffect } from 'react';
import { Solution, PlatformType } from '../types/contests';

/**
 * Custom hook for managing contest solution links
 * @returns Object containing solutions and management functions
 */
export const useSolutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  
  // Load solutions from localStorage on initial render
  useEffect(() => {
    const savedSolutions = localStorage.getItem('contestSolutions');
    if (savedSolutions) {
      try {
        setSolutions(JSON.parse(savedSolutions));
      } catch (error) {
        console.error('Error parsing solutions from localStorage:', error);
        setSolutions([]);
      }
    }
  }, []);
  
  // Save solutions to localStorage when they change
  useEffect(() => {
    localStorage.setItem('contestSolutions', JSON.stringify(solutions));
  }, [solutions]);
  
  /**
   * Add or update a solution for a contest
   * @param solution - Solution object to add/update
   */
  const addSolution = (solution: Solution) => {
    setSolutions(prev => {
      const existingIndex = prev.findIndex(s => s.contestId === solution.contestId);
      
      if (existingIndex >= 0) {
        // Update existing solution
        const updated = [...prev];
        updated[existingIndex] = solution;
        return updated;
      } else {
        // Add new solution
        return [...prev, solution];
      }
    });
  };
  
  /**
   * Remove a solution
   * @param contestId - ID of the contest to remove the solution for
   */
  const removeSolution = (contestId: string) => {
    setSolutions(prev => prev.filter(s => s.contestId !== contestId));
  };
  
  /**
   * Get a solution by contest ID
   * @param contestId - ID of the contest
   * @returns Solution object if found, undefined otherwise
   */
  const getSolution = (contestId: string) => {
    return solutions.find(s => s.contestId === contestId);
  };
  
  return {
    solutions,
    addSolution,
    removeSolution,
    getSolution,
  };
};
