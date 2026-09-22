"use client";

import React, { useState, useEffect } from "react";
import Category from "./Category";
import Dishes from "./components/Dishes";

export default function FoodMenuPage() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Хуудас анх ачааллахад localStorage-аас хадгалсан өгөгдлийг унших
  useEffect(() => {
    const savedCategories = localStorage.getItem("food_categories");
    const savedDishes = localStorage.getItem("food_dishes");

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error("Failed to parse categories", e);
      }
    }

    if (savedDishes) {
      try {
        setDishes(JSON.parse(savedDishes));
      } catch (e) {
        console.error("Failed to parse dishes", e);
      }
    }

    setIsLoaded(true); // Уншиж дууссаныг тэмдэглэх
  }, []);

  // 2. Categories өөрчлөгдөх бүрт localStorage руу хадгалах
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("food_categories", JSON.stringify(categories));
    }
  }, [categories, isLoaded]);

  // 3. Dishes өөрчлөгдөх бүрт localStorage руу хадгалах
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("food_dishes", JSON.stringify(dishes));
    }
  }, [dishes, isLoaded]);

  // Идэвхтэй байгаа категорийг олох
  const currentCategoryObj = categories.find((c) => c.id === activeCategory);
  const activeCategoryName =
    activeCategory === "all"
      ? "All Dishes"
      : currentCategoryObj
        ? currentCategoryObj.name
        : "Dishes";

  // Категори тус бүрийн хоолны тоог бодох
  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: dishes.filter((dish) => dish.categoryId === cat.id).length,
  }));

  // Сонгосон категориор хоолнуудыг шүүх
  const filteredDishes =
    activeCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.categoryId === activeCategory);

  // Өгөгдөл уншигдаж дуустал хоосон харагдахаас сэргийлэх
  if (!isLoaded) {
    return (
      <div className="w-full bg-[#f4f4f6] min-h-screen p-8">Loading...</div>
    );
  }

  return (
    <div className="w-full bg-[#f4f4f6] min-h-screen p-8 space-y-6">
      {/* Категорийн хэсэг */}
      <Category
        categories={categoriesWithCount}
        setCategories={setCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        totalDishesCount={dishes.length}
      />

      {/* Хоолны жагсаалтын хэсэг */}
      <Dishes
        dishes={filteredDishes}
        setDishes={setDishes}
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
      />
    </div>
  );
}
