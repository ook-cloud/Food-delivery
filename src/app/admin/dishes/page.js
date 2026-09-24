import { CategorySideBar } from "./_features/Category-sidebar";
import { DishGrid } from "./_features/Dish-grid";

export default function Dishes() {
  return (
    <div className="py-6 px-6 bg-gray min-h-screen w-full flex flex-col gap-6">
      <CategorySideBar />
      <DishGrid />
    </div>
  );
}
