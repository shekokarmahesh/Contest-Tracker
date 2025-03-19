import React from "react";
import { Bookmark } from "lucide-react";
import Layout from "../components/layout/Layout";
import ContestCard from "../components/contests/ContestCard";
import { useContests } from "../hooks/useContests";
import { useBookmarks } from "../hooks/useBookmarks";
import { FilterOptions } from "../types/contests";

const Bookmarks: React.FC = () => {
  // Fetch bookmarks and contests
  const { bookmarks } = useBookmarks();
  const { contests, isLoading } = useContests({
    platforms: { codeforces: true, codechef: true, leetcode: true },
    showBookmarksOnly: false, // Filtering manually
  });

  // Ensure contests exist and filter by bookmarks
  const bookmarkedContests = React.useMemo(
    () => contests.filter((contest) => bookmarks.includes(contest.id)),
    [contests, bookmarks]
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            <Bookmark className="inline-block mr-2 h-8 w-8" /> Bookmarked Contests
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your saved contests from all platforms
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent" />
          </div>
        ) : bookmarkedContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {bookmarkedContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No Bookmarked Contests</h3>
            <p className="text-muted-foreground">
              You haven't bookmarked any contests yet. Browse contests and click the bookmark icon to save them here.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;