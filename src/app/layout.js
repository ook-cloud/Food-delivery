import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

export const metadata = {
  title: "Food Delivery App",
  description: "Delicious food delivered to your door",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
