import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FadeUp from "@/components/ui/FadeUp";

import { marked } from "marked";

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  let article = null;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://aurvyz-y5qehoxb2a-ew.a.run.app' : 'http://localhost:8000')}/api/articles/${slug}`);
    if (res.ok) {
      article = await res.json();
    }
  } catch (error) {
    console.error("Error fetching article", error);
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FCFDFE] dark:bg-gray-950 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <Nav />
      <ScrollProgress />

      <main className="pt-32 pb-24">
        <article className="max-w-[1100px] mx-auto px-6">
          <FadeUp delay={0.1}>
            <div className="mb-10">
              <Link href="/insights" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Insights
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <header className="mb-14 max-w-4xl mx-auto text-center flex flex-col items-center">
              <div className="flex items-center gap-4 mb-6 justify-center flex-wrap">
                <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800 px-3 py-1 text-sm font-semibold shadow-sm">
                  {article.category}
                </Badge>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                  {article.readingTime}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-10">
                {article.title}
              </h1>

              <div className="flex items-center justify-between w-full py-5 border-y border-gray-100 dark:border-gray-800/60 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 text-left">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                    <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white leading-tight">{article.author.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{article.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors rounded-full">
                    <Bookmark className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors rounded-full">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </header>
          </FadeUp>

          <FadeUp delay={0.3}>
            <figure className="relative w-full aspect-[21/9] mb-20 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-xl border border-gray-100/50 dark:border-gray-800/50 group">
              <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-transparent transition-colors z-10" />
              <Image 
                src={article.imageUrl} 
                alt={article.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </figure>
          </FadeUp>

          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 relative">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-32 space-y-12">
                <FadeUp delay={0.4}>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-5">On this page</h4>
                    <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                      <li>
                        <a href="#introduction" className="flex items-center group hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-3 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors" /> Introduction
                        </a>
                      </li>
                      <li>
                        <a href="#architecture" className="flex items-center group hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-3 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors" /> The Architecture
                        </a>
                      </li>
                      <li>
                        <a href="#impact" className="flex items-center group hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mr-3 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors" /> Operational Impact
                        </a>
                      </li>
                    </ul>
                  </div>
                </FadeUp>
                
                <FadeUp delay={0.5}>
                  <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 dark:from-blue-950/40 dark:via-gray-900 dark:to-indigo-950/20 rounded-3xl border border-blue-100/60 dark:border-blue-900/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-20 transform translate-x-4 -translate-y-4 group-hover:rotate-12 transition-transform duration-500">
                      <Zap className="w-24 h-24 text-blue-600" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-extrabold text-xl text-gray-900 dark:text-white mb-3 tracking-tight">Systematize your business.</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">Stop wasting time on manual operations. We build custom AI workflows for modern businesses.</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-semibold group-hover:-translate-y-0.5 py-6">
                        Book Strategy Call <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </FadeUp>
              </div>
            </aside>

            <FadeUp delay={0.6} className="flex-1 w-full max-w-none min-w-0">
              <div className="prose prose-lg dark:prose-invert max-w-[700px] xl:max-w-[750px] mx-auto 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl 
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:w-full prose-img:border prose-img:border-gray-100 dark:prose-img:border-gray-800
                prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:py-3 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:rounded-r-2xl prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:font-medium
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d1117] prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-800 prose-pre:shadow-2xl prose-pre:rounded-2xl"
              >
                <div dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }} />
              </div>
            </FadeUp>
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
