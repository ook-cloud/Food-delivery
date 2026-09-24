import Image from "next/image";

export default function SubLayout({ children }) {
  return (
    <div className="grid w-full lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full ">{children}</div>
      </div>

      <div className="relative hidden w-full  lg:block">
        <Image
          src="/pictures/delivery.png"
          alt="delivery"
          width={856}
          height={904}
          className="rounded-4"
        />
        <div className="absolute inset-0" />
      </div>
    </div>
  );
}
