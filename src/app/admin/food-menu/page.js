"use client";

import React, { useState } from "react";
import Category from "./Category";
import Dishes from "./components/Dishes";

export default function FoodMenuPage() {
  const [activeCategory, setActiveCategory] = useState("appetizers");

  return (
    <div className="w-full bg-[#f4f4f6] min-h-screen p-8 space-y-6">
      {/* Ангилал болон Хоолнуудын хэсэг */}
      <Category
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Dishes />
    </div>
  );
}
