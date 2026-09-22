"use client";
import { LayoutDashboard } from "lucide-react";
import { Truck } from "lucide-react";
import { NomnomLogo } from "@/app/_icons/nomnomLogo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
export const Sidebar = ({ setState, state }) => {
  return (
    <div className="h-full w-51.25 flex flex-col gap-10 py-9 px-5 bg-[#FFFFFF]">
      <div className="w-41.25 h-11 flex gap-2">
        <NomnomLogo />
        <div className="flex flex-col w-20.25 h-11">
          <p className="font-inter font-semibold text-[18px] text-[#09090B] leading-7">
            NomNom
          </p>
          <p className="font-inter font-normal text-[12px] text-[#71717A] leading-4">
            Swift delivery
          </p>
        </div>
      </div>
      <div className="w-41.25 h-26 flex flex-col gap-6">
        <div
          onClick={() => setState(1)}
          className={cn(
            "select-none transition-all duration-200 w-41.25 h-10 flex gap-2  items-center px-6 rounded-full bg-[#18181B] cursor-pointer",
            state === 1
              ? "bg-[#18181B] text-[#FAFAFA]  "
              : "bg-[#FFFFFF] text-[#09090B]  ",
          )}
        >
          <LayoutDashboard className="w-5.5 h-5.5 " />
          <p className="font-inter font-medium text-[14px] leading-5">
            Food menu
          </p>
        </div>
        <div
          onClick={() => setState(2)}
          className={cn(
            "select-none transition-all duration-200 w-41.25 h-10 flex gap-2  items-center px-6 rounded-full bg-[#18181B] cursor-pointer",
            state === 2
              ? "bg-[#18181B] text-[#FAFAFA]  "
              : "bg-[#FFFFFF] text-[#09090B]  ",
          )}
        >
          <Truck className="w-5.5 h-5.5" />
          <p className="font-inter font-medium text-[14px] leading-5">Orders</p>
        </div>
      </div>
    </div>
  );
};