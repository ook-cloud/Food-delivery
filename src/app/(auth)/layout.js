import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Зүүн тал - Форм */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 overflow-y-auto">
        <div className="w-full max-w-sm">{children}</div>
      </div>

      {/* Баруун тал - Зураг (Дэлгэц дээрх шиг булангуудыг нь муруйлгах) */}
      <div className="w-1/2 p-4 h-full">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src="/auth-bg.svg"
            alt="Auth background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
