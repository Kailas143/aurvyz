import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export function ArticleCard({ article }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group block">
      <div className="flex flex-col h-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-gray-900 dark:bg-black/90 dark:text-white backdrop-blur-sm border-none shadow-sm">
              {article.category}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div className="text-xs">
                <p className="font-medium text-gray-900 dark:text-white">{article.author.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
              <Clock className="w-3 h-3 mr-1" />
              {article.readingTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
