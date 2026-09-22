"use client";

import React, { useState } from "react";
import Category from "./Category";
import Dishes from "./Dishes"; // Хавтасны замыг өөрийн бүтэцтэй тааруулаарай

export default function FoodMenuPage() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

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

  // Сонгосон категорид хамаарах хоолнуудыг шүүж харуулах
  const filteredDishes =
    activeCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.categoryId === activeCategory);

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
