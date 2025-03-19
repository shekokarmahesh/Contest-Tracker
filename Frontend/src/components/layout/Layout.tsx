
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component that wraps all pages
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="glass-card border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Contest Tracker - Stay updated with coding competitions</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
