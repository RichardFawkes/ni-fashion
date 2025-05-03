'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10">
      <div className="relative">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 transition-all duration-300 text-sm font-accent uppercase tracking-wider ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Linha decorativa */}
        <div className="w-full h-px bg-gray-200 mt-8 mb-10 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-24 h-2 bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
} 