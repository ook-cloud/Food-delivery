"use client";

import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function OrdersLayout() {
  return (
    <div className="w-full bg-[#f4f4f5] min-h-screen p-8 flex flex-col justify-between">
      <div>
        {/* Картын толгой болон Хүснэгтийн header хэсэг */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          {/* Толгой хэсэг: Гарчиг, Огноо, Товчлуур */}
          <div className="p-6 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-black tracking-tight">
                Orders
              </h1>
              <p className="text-xs text-gray-400 mt-1 font-medium">32 items</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Огнооны шүүлтүүр */}
              <div className="flex items-center gap-2.5 px-4 py-2 border border-gray-200 rounded-full text-xs font-medium text-gray-700 bg-white shadow-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>13 June 2023 - 14 July 2023</span>
              </div>

              {/* Change delivery state товчлуур */}
              <button
                disabled
                className="px-5 py-2.5 bg-[#d4d4d8] text-white rounded-full text-xs font-semibold cursor-not-allowed transition-all"
              >
                Change delivery state
              </button>
            </div>
          </div>

          {/* Хүснэгтийн багануудын нэр (Header) */}
          <div className="border-t border-b border-gray-100 bg-gray-50/50 px-6 py-3">
            <div className="grid grid-cols-[30px_40px_1.5fr_1fr_1fr_1fr_2fr_1fr] items-center text-xs text-gray-500 font-medium">
              <div>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 cursor-pointer"
                />
              </div>
              <div>№</div>
              <div>Customer</div>
              <div>Food</div>
              <div className="flex items-center gap-1 cursor-pointer">
                Date <span>↕</span>
              </div>
              <div>Total</div>
              <div>Delivery Address</div>
              <div className="flex items-center justify-end gap-1 cursor-pointer">
                Delivery state <span>↕</span>
              </div>
            </div>
          </div>

          {/* Голын контент орох хэсэг */}
          <div className="min-h-[300px] flex items-center justify-center text-gray-300 text-sm">
            --- Голын хүснэгтийн мөрүүд энд байрлана ---
          </div>
        </div>
      </div>

      {/* Хөлний хуудаслалт (Pagination) */}
      <div className="flex justify-end items-center gap-1.5 pt-6 text-xs font-medium text-gray-600">
        <button className="p-1.5 hover:bg-gray-200 rounded-full text-gray-400 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 bg-[#27272a] text-white rounded-full flex items-center justify-center font-semibold shadow-sm">
          1
        </button>
        <button className="w-8 h-8 hover:bg-gray-200/70 rounded-full flex items-center justify-center transition-colors">
          2
        </button>
        <button className="w-8 h-8 hover:bg-gray-200/70 rounded-full flex items-center justify-center transition-colors">
          3
        </button>
        <button className="w-8 h-8 hover:bg-gray-200/70 rounded-full flex items-center justify-center transition-colors">
          4
        </button>
        <button className="w-8 h-8 hover:bg-gray-200/70 rounded-full flex items-center justify-center transition-colors">
          5
        </button>
        <span className="px-1 text-gray-400">...</span>
        <button className="w-8 h-8 hover:bg-gray-200/70 rounded-full flex items-center justify-center transition-colors">
          10
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded-full text-gray-400 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
