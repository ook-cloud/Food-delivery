import "@/app/globals.css"; // Төслийн үндсэн Tailwind CSS импорт

export const metadata = {
  title: "Food Delivery App",
  description: "Order your favorite food easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
