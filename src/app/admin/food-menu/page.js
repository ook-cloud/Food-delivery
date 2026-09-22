"use client";

import React, { useState, useEffect } from "react";
import Category from "./Category";
import Dishes from "./components/Dishes";

export default function FoodMenuPage() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage унших
  useEffect(() => {
    const savedCategories = localStorage.getItem("food_categories");
    const savedDishes = localStorage.getItem("food_dishes");

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedDishes) {
      try {
        setDishes(JSON.parse(savedDishes));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  // LocalStorage хадгалах
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("food_categories", JSON.stringify(categories));
    }
  }, [categories, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("food_dishes", JSON.stringify(dishes));
    }
  }, [dishes, isLoaded]);

  // Категори тус бүрийн тоог бодож дамжуулах
  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: dishes.filter((dish) => dish.categoryId === cat.id).length,
  }));

  if (!isLoaded) {
    return (
      <div className="w-full bg-[#f4f4f6] min-h-screen p-8">Loading...</div>
    );
  }

  return (
    <div className="w-full bg-[#f4f4f6] min-h-screen p-8 space-y-6">
      {/* 1. Категори сонгох дээд хэсэг */}
      <Category
        categories={categoriesWithCount}
        setCategories={setCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        totalDishesCount={dishes.length}
      />

      {/* 2. Категори тус бүрээр цуврах хоолнуудын хэсэг */}
      <Dishes
        categories={categoriesWithCount}
        dishes={dishes}
        setDishes={setDishes}
        activeCategory={activeCategory}
      />
    </div>
  );
}
