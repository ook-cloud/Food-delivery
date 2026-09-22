"use client";

import React, { useState } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialCategories = [
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

export default function Category({
  activeCategory = "appetizers",
  setActiveCategory,
}) {
  const [categories] = useState(initialCategories);
  const [isOpen, setIsOpen] = useState(false);

  // Формын state-үүд
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);

  // Одоо сонгогдсон категорийн нэрийг авах
  const currentCategory = categories.find((c) => c.id === activeCategory);
  const activeCategoryName = currentCategory
    ? currentCategory.name
    : "Appetizers";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      category: activeCategoryName,
      foodName,
      foodPrice,
      ingredients,
      image,
    });

    // Форм цэвэрлэх & хаах
    setFoodName("");
    setFoodPrice("");
    setIngredients("");
    setImage(null);
    setIsOpen(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-gray-900">Dishes category</h2>

      {/* Категорийн товчнуудын жагсаалт */}
      <div className="flex flex-wrap items-center gap-2.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory && setActiveCategory(cat.id)}
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

        {/* Шинэ хоол нэмэх цонх нээх (+) товч */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm ml-1"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* "Add new Dish to [Category]" Модал цонх */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white p-6 rounded-3xl border-none shadow-2xl [&>button]:top-6 [&>button]:right-6 [&>button]:w-8 [&>button]:h-8 [&>button]:rounded-full [&>button]:bg-gray-100 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:opacity-100 [&>button]:hover:bg-gray-200">
          {/* Толгой хэсэг */}
          <DialogHeader className="p-0 border-b-0 mb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 text-left">
              Add new Dish to {activeCategoryName}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food name & Food price */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-gray-900">
                  Food name
                </label>
                <Input
                  type="text"
                  placeholder="Type food name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="h-10 rounded-xl border-gray-200 bg-white text-xs placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-black"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-gray-900">
                  Food price
                </label>
                <Input
                  type="text"
                  placeholder="Enter price..."
                  value={foodPrice}
                  onChange={(e) => setFoodPrice(e.target.value)}
                  className="h-10 rounded-xl border-gray-200 bg-white text-xs placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-black"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-gray-900">
                Ingredients
              </label>
              <Textarea
                placeholder="List ingredients..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="min-h-[90px] rounded-xl border-gray-200 bg-white text-xs placeholder:text-gray-400 resize-none focus-visible:ring-1 focus-visible:ring-black"
              />
            </div>

            {/* Food image */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-gray-900">
                Food image
              </label>
              <div className="relative border border-gray-200 bg-gray-50/50 hover:bg-gray-50 rounded-xl p-6 text-center flex flex-col items-center justify-center transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                  <ImageIcon className="w-4 h-4 text-gray-700" />
                </div>
                <p className="text-xs font-medium text-gray-700">
                  {image ? image.name : "Choose a file or drag & drop it here"}
                </p>
              </div>
            </div>

            {/* Add Dish Товчлуур */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-[#18181B] hover:bg-black text-white px-5 py-2 h-10 text-xs font-medium rounded-xl"
                disabled={!foodName || !foodPrice}
              >
                Add Dish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
