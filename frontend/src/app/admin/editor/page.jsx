"use client";
import { marked } from "marked";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Save, Send, Bold, Italic, Heading1, Heading2, List, Quote, Code, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminEditor() {
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("write");
  const [content, setContent] = useState("");
  
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

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Create Article</h1>
          <div className="flex gap-3">
            <Button variant="outline"><Save className="w-4 h-4 mr-2" /> Save Draft</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Send className="w-4 h-4 mr-2" /> Publish</Button>
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
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <Sparkles className="w-5 h-5" /> AI SEO Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white dark:bg-gray-950 p-3 rounded border border-gray-100 dark:border-gray-800 text-sm">
              <strong className="text-gray-900 dark:text-white block mb-1">Headline Suggestion</strong>
              This headline could improve CTR. Consider adding operational keywords like "Systematize" or "Scale".
            </div>
            <div className="bg-white dark:bg-gray-950 p-3 rounded border border-gray-100 dark:border-gray-800 text-sm">
              <strong className="text-gray-900 dark:text-white block mb-1">Internal Linking</strong>
              Based on your draft, you should link to your previous article: <span className="text-blue-600 underline cursor-pointer">Designing Workflow Automation</span>.
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-green-600 bg-green-50">Readability: High</Badge>
              <Badge variant="outline" className="text-amber-600 bg-amber-50">SEO Score: 78/100</Badge>
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
              <select className="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-md bg-transparent">
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
              <Input placeholder="my-article-slug" defaultValue={title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea placeholder="Short summary for search engines..." className="resize-none h-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
