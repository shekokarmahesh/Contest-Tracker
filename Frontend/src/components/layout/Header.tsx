
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Bookmark, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Main navigation header for the application
 */
const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
    
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <header className="glass-card sticky top-0 z-50 border-b backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        >
          Contest Tracker
        </Link>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <nav className="hidden sm:flex items-center mr-2">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                location.pathname === "/" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Contests
            </Link>
            
            <Link 
              to="/bookmarks" 
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                location.pathname === "/bookmarks" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Bookmarks
            </Link>
            
            <Link 
              to="/solutions" 
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                location.pathname === "/solutions" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Add Solutions
            </Link>
          </nav>
          
          {/* Mobile navigation */}
          <div className="sm:hidden flex items-center space-x-1">
            <Link to="/bookmarks">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-full",
                  location.pathname === "/bookmarks" && "bg-secondary"
                )}
              >
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Bookmarks</span>
              </Button>
            </Link>
            
            <Link to="/solutions">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-full",
                  location.pathname === "/solutions" && "bg-secondary"
                )}
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Solutions</span>
              </Button>
            </Link>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 transition-transform animate-scale-in" />
            ) : (
              <Moon className="h-5 w-5 transition-transform animate-scale-in" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
