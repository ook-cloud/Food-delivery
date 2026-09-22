"use client";

import React, { useState } from "react";
import { Plus, Pencil, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Dishes({
  categories = [],
  dishes = [],
  setDishes,
  activeCategory = "all",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingDishId, setEditingDishId] = useState(null);
  const [targetCategoryId, setTargetCategoryId] = useState(null);

  // Формын state-үүд
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Шинэ хоол нэмэх модал нээх
  const handleOpenAddModal = (catId) => {
    setEditingDishId(null);
    setTargetCategoryId(catId);
    setFoodName("");
    setFoodPrice("");
    setIngredients("");
    setImagePreview("");
    setIsOpen(true);
  };

  // Хоол засах модал нээх
  const handleOpenEditModal = (dish) => {
    setEditingDishId(dish.id);
    setTargetCategoryId(dish.categoryId);
    setFoodName(dish.title);
    setFoodPrice(dish.price);
    setIngredients(dish.description);
    setImagePreview(dish.image);
    setIsOpen(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !foodPrice) return;

    const formattedPrice = foodPrice.startsWith("$")
      ? foodPrice
      : `$${foodPrice}`;

    const imageUrl =
      imagePreview ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";

    if (editingDishId) {
      setDishes((prev) =>
        prev.map((dish) =>
          dish.id === editingDishId
            ? {
                ...dish,
                title: foodName,
                price: formattedPrice,
                description: ingredients,
                image: imageUrl,
              }
            : dish,
        ),
      );
    } else {
      const newDish = {
        id: Date.now(),
        categoryId: targetCategoryId,
        title: foodName,
        price: formattedPrice,
        description: ingredients,
        image: imageUrl,
      };
      setDishes((prev) => [newDish, ...prev]);
    }

    setIsOpen(false);
  };

  // Хэрэв "All Dishes" сонгогдсон бол бүх категориийг цувуулж харуулна, эсвэл зөвхөн тухайн сонгосон категорийг харуулна
  const displayCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <div className="space-y-8">
      {displayCategories.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
          Категори байхгүй байна. Дээд талын (+) товчийг дарж шинэ категори
          нэмнэ үү.
        </div>
      ) : (
        displayCategories.map((cat) => {
          const catDishes = dishes.filter((d) => d.categoryId === cat.id);

          return (
            <div
              key={cat.id}
              id={`category-section-${cat.id}`}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5"
            >
              {/* Категорийн Нэр ба Тоо */}
              <h2 className="text-base font-bold text-gray-900">
                {cat.name} ({catDishes.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Шинэ хоол нэмэх карт (Категори тус бүрт байна) */}
                <div
                  onClick={() => handleOpenAddModal(cat.id)}
                  className="border-2 border-dashed border-red-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] bg-red-50/10 hover:bg-red-50/30 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 text-center leading-tight">
                    Add new Dish to
                    <br />
                    {cat.name}
                  </p>
                </div>

                {/* 2. Тухайн категорийн хоолнууд */}
                {catDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="border border-gray-100 rounded-2xl p-3 flex flex-col space-y-3 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleOpenEditModal(dish)}
                        className="absolute bottom-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xs font-bold text-red-500 leading-tight">
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
        })
      )}

      {/* Add / Edit Dish Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white p-6 rounded-3xl border-none shadow-2xl [&>button]:top-6 [&>button]:right-6 [&>button]:w-8 [&>button]:h-8 [&>button]:rounded-full [&>button]:bg-gray-100 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:opacity-100 [&>button]:hover:bg-gray-200">
          <DialogHeader className="p-0 border-b-0 mb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 text-left">
              {editingDishId ? "Edit Dish" : "Add new Dish"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-gray-900">
                Ingredients
              </label>
              <Textarea
                placeholder="List ingredients..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="min-h-[90px] rounded-xl border-gray-200 bg-white text-xs placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-black resize-none"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-gray-900">
                Food image
              </label>
              <div className="relative border border-gray-200 bg-gray-50/50 hover:bg-gray-50 rounded-xl p-6 text-center flex flex-col items-center justify-center transition-colors cursor-pointer overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-xl mb-2 shadow-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                      <ImageIcon className="w-4 h-4 text-gray-700" />
                    </div>
                    <p className="text-xs font-medium text-gray-700">
                      Choose a file or drag & drop it here
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-[#18181B] hover:bg-black text-white px-5 py-2 h-10 text-xs font-medium rounded-xl"
                disabled={!foodName || !foodPrice}
              >
                {editingDishId ? "Save Changes" : "Add Dish"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
