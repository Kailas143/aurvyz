"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { analyticsData, scheduledArticles } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export default function AdminOverview() {
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
            <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.views.toLocaleString()}</div>
            <p className="text-xs text-green-500 font-medium mt-1">{analyticsData.viewsChange} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Reading Time</CardTitle>
            <Clock className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.readingTimeAvg}</div>
            <p className="text-xs text-green-500 font-medium mt-1">{analyticsData.readingTimeChange} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subscribers</CardTitle>
            <Users className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.subscribers.toLocaleString()}</div>
            <p className="text-xs text-green-500 font-medium mt-1">{analyticsData.subscribersChange} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.conversionRate}</div>
            <p className="text-xs text-green-500 font-medium mt-1">{analyticsData.conversionChange} from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <Card className="col-span-1 bg-gradient-to-br from-blue-900 to-indigo-900 border-none text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              AI Insights Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-blue-300 shrink-0" />
                <p className="text-sm">"AI workflow" articles are performing 34% better than the baseline this month.</p>
              </li>
              <li className="flex gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <Users className="w-5 h-5 text-blue-300 shrink-0" />
                <p className="text-sm">Case studies generate the highest conversion rate (4.8%) for strategy calls.</p>
              </li>
              <li className="flex gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <Clock className="w-5 h-5 text-blue-300 shrink-0" />
                <p className="text-sm">Suggested action: Publish more deep-dive architecture content to increase avg. reading time.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
