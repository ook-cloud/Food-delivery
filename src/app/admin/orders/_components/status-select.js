"use client";

import React from "react";

export default function StatusSelect({
  orderId,
  currentStatus,
  onStatusChange,
}) {
  return (
    <select
      value={currentStatus || "PENDING"}
      onChange={(e) => onStatusChange(orderId, e.target.value)}
      className={`px-3 py-1 rounded-full text-[12px] font-medium border outline-none cursor-pointer transition-colors ${
        currentStatus === "DELIVERED" || currentStatus === "Delivered"
          ? "text-green-600 border-green-200 bg-green-50"
          : currentStatus === "CANCELED" || currentStatus === "Cancelled"
            ? "text-red-600 border-red-200 bg-red-50"
            : "text-[#18181B] border-[#E4E4E7] bg-white"
      }`}
    >
      <option value="PENDING">PENDING</option>
      <option value="DELIVERED">DELIVERED</option>
      <option value="CANCELED">CANCELED</option>
    </select>
  );
}
