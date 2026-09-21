import React from "react";
import { Plus } from "lucide-react";

const categories = [
  { id: "all", name: "All Dishes", count: 112 },
  { id: "appetizers", name: "Appetizers", count: 6 },
  { id: "salads", name: "Salads", count: 3 },
  { id: "pizzas", name: "Pizzas", count: 5 },
  { id: "lunch", name: "Lunch favorites", count: 5 },
  { id: "main", name: "Main dishes", count: 5 },
  { id: "fish", name: "Fish & Sea foods", count: 5 },
  { id: "brunch", name: "Brunch", count: 5 },
  { id: "side", name: "Side dish", count: 5 },
  { id: "desserts", name: "Desserts", count: 5 },
  { id: "beverages", name: "Beverages", count: 5 },
];

export default function Category({ activeCategory, setActiveCategory }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-gray-900">Dishes category</h2>

      <div className="flex flex-wrap items-center gap-2.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isActive
                  ? "border-red-400 text-red-500 bg-white"
                  : "border-gray-200 text-gray-700 bg-white hover:border-gray-300"
              }`}
            >
              <span>{cat.name}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-black text-white">
                {cat.count}
              </span>
            </button>
          );
        })}

        <button className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm ml-1">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
