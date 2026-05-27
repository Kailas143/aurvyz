import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark, CheckCircle2 } from "lucide-react";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { articles } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { marked } from "marked";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <Nav />
      
      {/* Reading Progress Bar (simulated via CSS sticky) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 z-50">
        <div className="h-full bg-blue-600 w-1/3" />
      </div>

      <main className="pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/insights" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
            </Link>
          </div>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                {article.category}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                {article.readingTime}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-8">
              {article.title}
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{article.author.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{article.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Bookmark className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>

          <figure className="relative w-full aspect-[21/9] mb-16 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              fill 
              className="object-cover"
              priority
            />
          </figure>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">On this page</h4>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="#introduction" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Introduction</a></li>
                  <li><a href="#architecture" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">The Architecture</a></li>
                  <li><a href="#impact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Operational Impact</a></li>
                </ul>
                
                <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Want this system?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">We build custom AI workflows for modern businesses.</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Book Strategy Call</Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none flex-1">
              <div dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }} />
            </div>
          </div>
          
          <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
             <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  #{tag}
                </Badge>
              ))}
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
