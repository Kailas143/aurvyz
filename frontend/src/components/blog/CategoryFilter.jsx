import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mockData";

export function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selected === "All" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect("All")}
        className={selected === "All" ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100" : "bg-white dark:bg-gray-950"}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(category)}
          className={selected === category ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100" : "bg-white dark:bg-gray-950"}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
