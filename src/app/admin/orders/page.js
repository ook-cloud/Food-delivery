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

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [displayStatus, setDisplayStatus] = useState(1);
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const getDataFromOrders = async () => {
    try {
      setLoading(true);
      const response = await server.get("/order/get");

      setData(response.data.orders || []);
    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromOrders();
  }, []);
  const updateDataFromOrders = async () => {
    try {
      const response = await server.put("/order/put");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);

  if (loading) {
    return <div className="p-6">Loading Orders...</div>;
  }

  return (
    <div className="py-6 px-6 bg-[#F4F4F5] min-h-screen w-full">
      <div className="w-full flex flex-col gap-6 min-h-full items-end">
        <div className="w-9 h-9 rounded-full bg-gray-300"></div>

        <div className="w-full rounded-xl bg-white border border-solid border-[#E4E4E7] flex flex-col overflow-hidden">
          <div className="w-full h-19 p-4 flex justify-between items-center border-b border-[#E4E4E7]">
            <div className="flex flex-col">
              <p className="font-inter font-bold text-[20px] leading-7 text-[#09090B]">
                Orders
              </p>
              <p className="font-inter font-medium text-[12px] leading-4 text-[#71717A]">
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

              <div className="w-[180px] h-9 rounded-full bg-[#18181B] flex justify-center items-center font-inter font-medium text-[14px] text-[#FAFAFA] leading-5 cursor-pointer hover:bg-black transition-colors">
                Change delivery state
              </div>
            </div>
          </div>

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

          <div className="w-full flex flex-col bg-white">
            {!Array.isArray(data) || data.length === 0 ? (
              <div className="p-8 text-center text-[#71717A]">
                No orders found.
              </div>
            ) : (
              data.map((order, index) => (
                <div
                  key={order._id || index}
                  className="grid grid-cols-[40px_40px_2fr_3fr_1fr_100px_3fr_150px] gap-4 items-center px-4 py-3 border-b border-[#E4E4E7] text-[14px] text-[#09090B] hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E4E4E7] cursor-pointer"
                  />

                  <div>{index + 1}</div>

                  <div className="truncate pr-4">
                    {order.email || "test@gmail.com"}
                  </div>

                  <div className="flex flex-col gap-1 pr-4">
                    {order.items?.length > 0 ? (
                      order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <p className="truncate">{item.name}</p>
                          <span className="text-[#71717A]">
                            x{item.quantity}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[#71717A]">1 items</span>
                    )}
                  </div>

                  <div>
                    {order.createdAt
                      ? format(new Date(order.createdAt), "yyyy/MM/dd")
                      : "2024/12/20"}
                  </div>

                  <div className="font-medium">
                    ${order.totalAmount || "50.00"}
                  </div>

                  <div className="truncate text-[12px] text-[#71717A] pr-4">
                    {order.address}
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-medium border ${
                        order.status === "Delivered"
                          ? "text-green-600 border-green-200 bg-green-50"
                          : order.status === "Cancelled"
                            ? "text-red-600 border-red-200 bg-red-50"
                            : "text-[#18181B] border-[#E4E4E7] bg-white"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full h-14 border-t border-[#E4E4E7] flex justify-end items-center px-4">
            <div className="text-[14px] text-[#71717A]">
              1 - 10 of {Array.isArray(data) ? data.length : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
