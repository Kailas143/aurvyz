import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";

export function PrototypeCard({ prototype }) {
  return (
    <Card className="group overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={prototype.thumbnailUrl}
          alt={prototype.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" className="gap-2">
            <Play className="w-4 h-4" /> View Demo
          </Button>
        </div>
      </div>
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            {prototype.industry}
          </Badge>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Build Time: {prototype.buildTime}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{prototype.title}</h3>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {prototype.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {prototype.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 border-t border-gray-100 dark:border-gray-800 mt-auto flex justify-between items-center">
        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-0 h-auto gap-1">
          Read Case Study <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
