"use client";
import { marked } from "marked";
import { createClient } from "@supabase/supabase-js";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Save, Send, Bold, Italic, Heading1, Heading2, List, Quote, Code, Link as LinkIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiUrl } from "@/lib/api";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://okbmujshtcgwicsrowgy.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_xZRDudSaUqshCxW0_GcbuQ_V1kvAcC4";
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export default function AdminEditor() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("write");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("AI Systems");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  const [seoData, setSeoData] = useState({
    headline_suggestion: "Run SEO analysis to get headline ideas.",
    internal_linking: "Run SEO analysis for internal linking tips.",
    readability: "-",
    seo_score: "-"
  });
  const [isAnalyzingSEO, setIsAnalyzingSEO] = useState(false);

  const insertFormatting = (prefix, suffix = "") => {
    const textarea = document.getElementById("content");
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);

    try {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase credentials are not configured.");
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast.success("Image uploaded securely to Supabase!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred during upload.");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleAnalyzeSEO = async () => {
    if (!title && !content) {
      toast.error("Please add a title and content to analyze.");
      return;
    }
    
    setIsAnalyzingSEO(true);
    try {
      const res = await fetch(apiUrl("/seo-analyze"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      
      if (res.ok) {
        const data = await res.json();
        setSeoData(data);
        toast.success("SEO analysis complete!");
      } else {
        toast.error("Failed to analyze SEO.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to AI service.");
    } finally {
      setIsAnalyzingSEO(false);
    }
  };

  const handlePublish = async () => {
    if (!title || !content) {
      toast.error("Please provide a title and content before publishing.");
      return;
    }
    
    setIsPublishing(true);
    const finalSlug = slug || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
      const res = await fetch(apiUrl("/articles"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          category,
          slug: finalSlug,
          excerpt,
          imageUrl: imageUrl || undefined
        })
      });

      if (res.ok) {
        toast.success("Article published successfully!");
        router.push("/insights");
      } else {
        toast.error("Failed to publish the article.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Create Article</h1>
          <div className="flex gap-3">
            <Button variant="outline"><Save className="w-4 h-4 mr-2" /> Save Draft</Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />} 
              Publish
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">Article Title</Label>
              <Input 
                id="title" 
                placeholder="Enter a compelling headline..." 
                className="text-lg py-6"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Label htmlFor="content" className="text-base font-semibold">Content</Label>
                  <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-1">
                    <button 
                      onClick={() => setMode("write")} 
                      className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${mode === "write" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                    >
                      Write
                    </button>
                    <button 
                      onClick={() => setMode("preview")} 
                      className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${mode === "preview" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {mode === "write" && (
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("**", "**")} title="Bold">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("*", "*")} title="Italic">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("# ")} title="Heading 1">
                      <Heading1 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("## ")} title="Heading 2">
                      <Heading2 className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("- ")} title="Bullet List">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("> ")} title="Quote">
                      <Quote className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("`", "`")} title="Code">
                      <Code className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("[", "](url)")} title="Link">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              {mode === "write" ? (
                <Textarea 
                  id="content" 
                  placeholder="Write your article content here..." 
                  className="min-h-[500px] font-mono text-sm resize-y mt-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <div className="min-h-[500px] p-6 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 prose prose-sm dark:prose-invert max-w-none mt-2 overflow-y-auto">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
                  ) : (
                    <p className="text-gray-400 italic">Nothing to preview yet. Switch back to Write mode to start drafting.</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <Card className="border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <Sparkles className="w-5 h-5" /> AI SEO Assistant
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 border-blue-200 hover:bg-blue-100 text-blue-700 dark:border-blue-800 dark:hover:bg-blue-900/50 dark:text-blue-300"
              onClick={handleAnalyzeSEO}
              disabled={isAnalyzingSEO}
            >
              {isAnalyzingSEO ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Sparkles className="w-4 h-4 mr-1" />}
              Analyze
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="bg-white dark:bg-gray-950 p-3 rounded border border-gray-100 dark:border-gray-800 text-sm">
              <strong className="text-gray-900 dark:text-white block mb-1">Headline Suggestion</strong>
              {seoData.headline_suggestion}
            </div>
            <div className="bg-white dark:bg-gray-950 p-3 rounded border border-gray-100 dark:border-gray-800 text-sm">
              <strong className="text-gray-900 dark:text-white block mb-1">Internal Linking</strong>
              {seoData.internal_linking}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className={`${seoData.readability === 'High' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                Readability: {seoData.readability}
              </Badge>
              <Badge variant="outline" className={`${seoData.seo_score > 70 ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
                SEO Score: {seoData.seo_score}/100
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Post Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label>Category</Label>
              <select 
                className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-md bg-transparent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>AI Systems</option>
                <option>Workflow Automation</option>
                <option>Engineering</option>
                <option>Case Studies</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Publish Date / Schedule</Label>
              <Input type="datetime-local" className="bg-transparent" />
            </div>
            <div className="space-y-2">
              <Label>URL Slug</Label>
              <Input 
                placeholder="my-article-slug" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="text-xs text-gray-500">Auto-generated from title if left blank.</p>
            </div>
            <div className="space-y-2">
              <Label>Cover Image</Label>
              {imageUrl && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 mb-2 group">
                  <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-4 file:py-1 file:mr-4 file:font-semibold hover:file:bg-blue-100 cursor-pointer"
                />
                {isUploadingImage && <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea 
                placeholder="Short summary for search engines..." 
                className="resize-none h-24" 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
