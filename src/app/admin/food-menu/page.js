import { CategoryChips } from "./_features/category-chips";
import { DishGrid } from "./_features/dish-grid";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1010";

async function getCategories() {
  const res = await fetch(`${API_URL}/food-category/get`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.foodCategory ?? [];
}
async function getFoods() {
  const res = await fetch(`${API_URL}/food/get`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.foods ?? [];
}

export default async function FoodMenuPage() {
  const [categories, foods] = await Promise.all([getCategories(), getFoods()]);

  const sections = categories.map((c) => ({
    category: c.categoryName,
    categoryId: c._id,
    dishes: foods
      .filter((f) => f.category?._id === c._id)
      .map((f) => ({
        id: f._id,
        name: f.foodName,
        price: f.price,
        ingredients: Array.isArray(f.ingredients)
          ? f.ingredients.join(", ")
          : f.ingredients,
        image: f.image,
      })),
  }));

  const chips = categories.map((c) => ({
    id: c._id,
    label: c.categoryName,
    count: foods.filter((f) => f.category?._id === c._id).length,
  }));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <CategoryChips chips={chips} totalCount={foods.length} />
      <DishGrid sections={sections} categories={categories} />
    </div>
  );
}
