import React from "react";
import { Plus, Pencil } from "lucide-react";

const mockDishes = Array(6).fill({
  id: 1,
  title: "Brie Crostini Appetizer",
  price: "$12.99",
  description:
    "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
});

export default function Dishes() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
      <h2 className="text-base font-bold text-gray-900">Appetizers (6)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* А. Шинэ хоол нэмэх карт */}
        <div className="border-2 border-dashed border-red-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] bg-red-50/10 hover:bg-red-50/30 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-gray-800 text-center leading-tight">
            Add new Dish to
            <br />
            Appetizers
          </p>
        </div>

        {/* Б. Хоолны картууд */}
        {mockDishes.map((dish, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-2xl p-3 flex flex-col space-y-3 hover:shadow-md transition-shadow bg-white"
          >
            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={dish.image}
                alt={dish.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md hover:bg-red-50 transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xs font-bold text-red-400 leading-tight">
                  {dish.title}
                </h3>
                <span className="text-xs font-semibold text-gray-800">
                  {dish.price}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                {dish.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
