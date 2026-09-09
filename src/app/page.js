import { redirect } from "next/navigation";

export default function RootPage() {
  // Эхний шатанд шууд Нүүр хуудас руу эсвэл /login руу шилжүүлж болно
  redirect("/login");
}
