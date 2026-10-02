"use client";

import React, { useState, useEffect } from "react";
import { server } from "@/app/_api/api";
import { format, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import OrderTable from "./_features/order-table";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  // Захиалгуудыг татаж авах
  const getDataFromOrders = async () => {
    try {
      setLoading(true);
      const response = await server.get("/order/get");
      setData(response.data.orders || []);
    } catch (err) {
      console.error("Orders fetch error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromOrders();
  }, []);

  // Status өөрчлөх
  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId) {
      alert("Order ID олдсонгүй.");
      return;
    }

    try {
      const response = await server.put("/order/put", {
        id: orderId,
        status: newStatus,
      });

      if (response.status === 200 || response.status === 201) {
        getDataFromOrders();
      }
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to update order status.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen font-inter">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="py-6 px-6 bg-[#F4F4F5] min-h-screen w-full font-inter">
      <div className="w-full flex flex-col gap-6 min-h-full items-end">
        <div className="w-9 h-9 rounded-full bg-gray-300"></div>

        <div className="w-full rounded-xl bg-white border border-solid border-[#E4E4E7] flex flex-col overflow-hidden shadow-sm">
          {/* Header */}
          <div className="w-full h-19 p-4 flex justify-between items-center border-b border-[#E4E4E7]">
            <div className="flex flex-col">
              <p className="font-bold text-[20px] leading-7 text-[#09090B]">
                Orders
              </p>
              <p className="font-medium text-[12px] leading-4 text-[#71717A]">
                {Array.isArray(data) ? data.length : 0} items
              </p>
            </div>

            <div className="flex gap-3">
              <Popover>
                <PopoverTrigger
                  id="date"
                  className="w-[300px] h-9 rounded-full border border-solid border-[#E4E4E7] bg-white flex items-center justify-start px-4 font-normal text-[#09090B] hover:bg-gray-50 transition-colors"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#71717A]" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="text-[#71717A]">Pick a date</span>
                  )}
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              <div className="w-[180px] h-9 rounded-full bg-[#18181B] flex justify-center items-center font-medium text-[14px] text-[#FAFAFA] leading-5 cursor-pointer hover:bg-black transition-colors">
                Change delivery state
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="w-full bg-[#F4F4F5CC] border-b border-[#E4E4E7]">
            <div className="grid grid-cols-[40px_40px_2fr_3fr_1fr_100px_3fr_150px] gap-4 items-center px-4 py-3 text-[14px] font-medium text-[#71717A]">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#E4E4E7] cursor-pointer"
              />
              <div>#</div>
              <div>Customer</div>
              <div>Food</div>
              <div>Date</div>
              <div>Total</div>
              <div>Delivery Address</div>
              <div>Delivery state</div>
            </div>
          </div>

          {/* Table Body (OrderTable компонент ашиглав) */}
          <OrderTable data={data} onStatusChange={handleStatusChange} />

          {/* Table Footer */}
          <div className="w-full h-14 border-t border-[#E4E4E7] flex justify-end items-center px-4">
            <div className="text-[14px] text-[#71717A]">
              1 - {Array.isArray(data) ? data.length : 0} of{" "}
              {Array.isArray(data) ? data.length : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
