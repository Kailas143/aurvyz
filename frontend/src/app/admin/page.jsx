"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, TrendingUp, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function AdminOverview() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [scheduledArticles, setScheduledArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/analytics`).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/scheduled-articles`).then(r => r.json())
    ])
    .then(([analytics, articles]) => {
      setAnalyticsData(analytics);
      setScheduledArticles(articles);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching admin data:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load admin overview data.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back. Here is what is happening with your publication.</p>
        </div>
        <Link href="/admin/editor">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="w-4 h-4" /> Create Article
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Published Articles</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.articlesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Categories</CardTitle>
            <Clock className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.categoriesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Live Prototypes</CardTitle>
            <Users className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.prototypesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Scheduled Drafts</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.scheduledCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{article.title}</h4>
                    <p className="text-xs text-gray-500">{article.author} • {article.category}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={article.status === "Scheduled" ? "default" : "secondary"} className={article.status === "Scheduled" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}>
                      {article.status}
                    </Badge>
                    {article.publishDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(article.publishDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/scheduler">View Full Calendar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
