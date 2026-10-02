"use client";

import React from "react";
import { format } from "date-fns";
import StatusSelect from "../_components/status-select";

export default function OrderTable({ data, onStatusChange }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-8 text-center text-[#71717A]">No orders found.</div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {data.map((order, index) => (
        <div
          key={order._id || index}
          className="grid grid-cols-[40px_40px_2fr_3fr_1fr_100px_3fr_150px] gap-4 items-center px-4 py-3 border-b border-[#E4E4E7] text-[14px] text-[#09090B] hover:bg-gray-50 transition-colors"
        >
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-[#E4E4E7] cursor-pointer"
          />

          <div>{index + 1}</div>

          {/* Customer Email */}
          <div className="truncate pr-4">
            {typeof order.user === "object"
              ? order.user?.email || "N/A"
              : order.user || "N/A"}
          </div>

          {/* Food items */}
          <div className="flex flex-col gap-1 pr-4">
            {order.foodOrderItems?.length > 0 ? (
              order.foodOrderItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <p className="truncate">
                    {item.food?.foodName || item.food?.name || "Dish"}
                  </p>
                  <span className="text-[#71717A]">x{item.quantity}</span>
                </div>
              ))
            ) : (
              <span className="text-[#71717A]">0 items</span>
            )}
          </div>

          {/* Date */}
          <div>
            {order.createdAt
              ? format(new Date(order.createdAt), "yyyy/MM/dd")
              : "-"}
          </div>

          {/* Total Price */}
          <div className="font-medium">
            $
            {order.totalPrice !== undefined && order.totalPrice !== null
              ? Number(order.totalPrice).toFixed(2)
              : "0.00"}
          </div>

          {/* Delivery Address */}
          <div className="truncate text-[12px] text-[#71717A] pr-4">
            {order.address || "-"}
          </div>

          {/* Delivery Status (StatusSelect компонент ашиглав) */}
          <div>
            <StatusSelect
              orderId={order._id}
              currentStatus={order.status}
              onStatusChange={onStatusChange}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
