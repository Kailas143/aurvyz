import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export function FeaturedArticle({ article }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group block mb-12">
      <div className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 md:flex">
        <div className="relative h-64 md:h-auto md:w-3/5 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
        <div className="p-8 md:p-12 md:w-2/5 flex flex-col justify-center bg-white dark:bg-gray-950">
          <div className="mb-4">
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              {article.category}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {article.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{article.author.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{article.author.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex items-center justify-end text-xs text-gray-500 dark:text-gray-400 font-medium">
                <Clock className="w-3 h-3 mr-1" />
                {article.readingTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
