export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white p-4 lg:p-6 gap-6">
      {/* Зүүн тал - Форм байрлах хэсэг */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>

      {/* Баруун тал - Зураг бүхий хэсэг */}
      <div className="hidden lg:block relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop"
          alt="Delivery courier"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
