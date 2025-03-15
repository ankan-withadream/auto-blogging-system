import { useQuery } from "@tanstack/react-query";
import { BlogCard } from "@/components/blog/BlogCard";
import { type Post } from "@shared/schema";
import { Header } from "@/components/common/Header";
import { useState } from "react";
import { FiSearch, FiTrendingUp, FiClock, FiStar } from "react-icons/fi";

export default function Home() {
  const [activeTab, setActiveTab] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: posts, isLoading } = useQuery<Post[]>({ 
    queryKey: ['/api/posts']
  });

  // Filter posts based on active tab (in a real app, you might fetch different data)
  const filteredPosts = posts?.filter(post => {
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const tabs = [
    { id: "latest", label: "Latest", icon: <FiClock className="mr-1" /> },
    { id: "trending", label: "Trending", icon: <FiTrendingUp className="mr-1" /> },
    { id: "popular", label: "Most Popular", icon: <FiStar className="mr-1" /> },
  ];

  // Mock popular tags (replace with real data in production)
  const popularTags = [
    "JavaScript", "React", "TypeScript", "CSS", "Node.js", 
    "Web Development", "Programming", "Tech", "Beginners"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      
      {/* Hero section with search */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">All the smartphone news in one place</h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto">Stay updated with the latest smartphone news, reviews, and trends from experts around the world.</p>
          
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 pr-12 rounded-full border-2 border-white focus:outline-none focus:border-blue-300 bg-white/90 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-4 top-3.5 text-gray-500 text-xl" />
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="w-full md:w-3/4">
            {/* Tabbed navigation */}
            <div className="border-b mb-6">
              <nav className="flex space-x-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`flex items-center pb-4 px-1 font-medium text-sm transition-colors ${
                      activeTab === tab.id 
                        ? "border-b-2 border-blue-600 text-blue-600" 
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-40 bg-gray-200 animate-pulse" />
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-2/3" />
                      <div className="h-10 mt-4 flex items-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse mr-3" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredPosts && filteredPosts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold">No posts found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 sticky top-4">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button 
                    key={tag} 
                    className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h2 className="font-bold text-lg mb-4 text-gray-800">Join Our Newsletter</h2>
                <p className="text-gray-600 text-sm mb-3">Get the latest posts delivered straight to your inbox.</p>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
