"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsData } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAnalytics() {
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

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.trafficChart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analyticsData.topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-500">{category.views.toLocaleString()} views</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: \`\${(category.views / analyticsData.topCategories[0].views) * 100}%\` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Organic Search</span>
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">45%</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="font-medium">Direct</span>
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">25%</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span className="font-medium">Social (LinkedIn)</span>
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">20%</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="font-medium">Referral</span>
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
