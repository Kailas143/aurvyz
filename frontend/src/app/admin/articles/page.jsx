"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchArticles = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://aurvyz-y5qehoxb2a-ew.a.run.app' : 'http://localhost:8000');
      const res = await fetch(`${backendUrl}/api/articles`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        toast.error("Failed to load articles");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) return;

    setIsDeleting(id);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://aurvyz-y5qehoxb2a-ew.a.run.app' : 'http://localhost:8000');
      const res = await fetch(`${backendUrl}/api/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Article deleted successfully");
        setArticles(articles.filter((a) => a.id !== id));
      } else {
        toast.error("Failed to delete article");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting article");
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Articles</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your published insights and articles.</p>
        </div>
        <Link href="/admin/editor">
          <Button>Create New</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No articles found. Start writing!
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      {article.title}
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{article.slug}</div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                        {article.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/insights/${article.slug}`} target="_blank">
                        <Button variant="outline" size="icon" title="View live">
                          <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        title="Delete article"
                        onClick={() => handleDelete(article.id)}
                        disabled={isDeleting === article.id}
                      >
                        {isDeleting === article.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
