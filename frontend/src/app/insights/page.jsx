"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

export default function InsightsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://aurvyz-y5qehoxb2a-ew.a.run.app' : 'http://localhost:8000')}/api/articles`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && article.id !== featuredArticle.id;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-gray-950 flex flex-col font-sans">
      <Nav />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <header className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Operational Insights for Modern Businesses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Engineering systems, workflows, and intelligent automation for businesses that want to scale smarter.
            </p>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              {featuredArticle && <FeaturedArticle article={featuredArticle} />}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filter.</p>
            </div>
          )}
          </>
          )}

          <NewsletterSignup />

        </div>
      </main>

      <Footer />
    </div>
  );
}
