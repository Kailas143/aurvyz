"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MoreVertical, Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminScheduler() {
  const [scheduledArticles, setScheduledArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://aurvyz-y5qehoxb2a-ew.a.run.app' : 'http://localhost:8000')}/api/scheduled-articles`)
      .then(res => res.json())
      .then(data => {
        setScheduledArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching scheduled articles:", err);
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Scheduler</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your publishing calendar and automation queue.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="w-4 h-4" /> Schedule Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming & Scheduled</CardTitle>
              <Button variant="outline" size="sm">Calendar View</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledArticles.map((article) => (
                  <div key={article.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg group hover:border-blue-200 transition-colors">
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant={article.status === "Scheduled" ? "default" : "secondary"} className={article.status === "Scheduled" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}>
                          {article.status}
                        </Badge>
                        <span className="text-sm font-medium text-gray-500">{article.category}</span>
                      </div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{article.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">Author: {article.author}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      {article.publishDate ? (
                        <div className="text-sm text-right">
                          <div className="flex items-center text-gray-900 dark:text-white font-medium mb-1">
                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(article.publishDate).toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400 italic">No date set</div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-50 dark:bg-gray-900/50 border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CalendarIcon className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Drop Draft Here</h3>
              <p className="text-sm text-gray-500 max-w-[200px] mb-4">Drag an existing draft to schedule it automatically.</p>
              <Button variant="secondary" size="sm">Browse Drafts</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Timezone</span>
                <span className="font-medium">UTC-08:00 (PST)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Social Trigger</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Email Notify</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
