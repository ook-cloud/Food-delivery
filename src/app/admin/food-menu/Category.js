"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Category({
  activeCategory,
  setActiveCategory,
  totalDishesCount = 0,
}) {
  // Категориудыг дотроо state-ээр удирдана
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const newCat = {
      id: categoryName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
      name: categoryName.trim(),
      count: 0,
    };

    setCategories((prev) => [...prev, newCat]);
    if (setActiveCategory) {
      setActiveCategory(newCat.id);
    }

    setCategoryName("");
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-gray-900">Dishes category</h2>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* All Dishes карт */}
        <button
          onClick={() => setActiveCategory && setActiveCategory("all")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
            activeCategory === "all" || !activeCategory
              ? "border-red-400 text-red-500 bg-white"
              : "border-gray-200 text-gray-700 bg-white hover:border-gray-300"
          }`}
        >
          <span>All Dishes</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-black text-white">
            {totalDishesCount}
          </span>
        </button>

        {/* Шинээр нэмэгдсэн категориуд */}
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
                {cat.count || 0}
              </span>
            </button>
          );
        })}

        {/* Шинэ категори нэмэх (+) товч */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm ml-1"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* "Add new category" Модал */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[460px] bg-white p-8 rounded-3xl border-none shadow-2xl [&>button]:top-6 [&>button]:right-6 [&>button]:w-9 [&>button]:h-9 [&>button]:rounded-full [&>button]:bg-gray-100 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:opacity-100 [&>button]:hover:bg-gray-200 border-0">
          <DialogHeader className="p-0 border-b-0 mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900 text-left">
              Add new category
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddCategory} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-gray-900">
                Category name
              </label>
              <Input
                type="text"
                placeholder="Type category name..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-black"
                autoFocus
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-[#121217] hover:bg-black text-white px-6 py-2.5 h-11 text-sm font-medium rounded-xl"
                disabled={!categoryName.trim()}
              >
                Add category
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
