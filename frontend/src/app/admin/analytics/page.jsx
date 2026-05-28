"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/analytics`);
        if (res.ok) {
          const data = await res.json();
          setAnalyticsData(data);
        } else {
          console.error("Failed to fetch analytics");
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
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
        Failed to load analytics data.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Deep dive into how your audience is interacting with your systems.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
        </div>
      </div>



      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Content by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analyticsData.topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-500">{category.count} Articles</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.topCategories[0].count > 0 ? (category.count / analyticsData.topCategories[0].count) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
