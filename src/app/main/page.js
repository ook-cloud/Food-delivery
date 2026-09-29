import { Footer } from "./_features/footer";
import { Header } from "./_features/header";
import { Hero } from "./_features/hero";
import { FoodGrid } from "./_features/food-grid";

export default function Main() {
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <Header />
      <div className="flex flex-col w-full items-center gap-22">
        <Hero />
        <FoodGrid />
        <Footer />
      </div>
    </div>
  );
}
