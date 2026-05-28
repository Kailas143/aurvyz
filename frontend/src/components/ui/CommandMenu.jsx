"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  
  const [articles, setArticles] = React.useState([]);
  const [prototypes, setPrototypes] = React.useState([]);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(console.error);
      
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/prototypes`)
      .then(res => res.json())
      .then(data => setPrototypes(data))
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Articles">
            {articles.map((article) => (
              <CommandItem
                key={article.id}
                onSelect={() => runCommand(() => router.push(`/insights/${article.slug}`))}
              >
                {article.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Prototypes">
            {prototypes.map((prototype) => (
              <CommandItem
                key={prototype.id}
                onSelect={() => runCommand(() => router.push(`/prototypes`))}
              >
                {prototype.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Admin">
            <CommandItem onSelect={() => runCommand(() => router.push("/admin"))}>
              CMS Dashboard
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin/editor"))}>
              Create Article
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
