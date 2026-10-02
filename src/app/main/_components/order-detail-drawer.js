"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Utensils, Clock, MapPin } from "lucide-react";
import { server } from "@/app/_api/api";
import { format } from "date-fns";

export default function OrderDetailDrawer({ isOpen, onClose, userId }) {
  const [activeTab, setActiveTab] = useState("Order");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserOrders = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await server.get(`/order/get`);
      const allOrders = res.data.orders || [];
      const userOrders = allOrders.filter((ord) => {
        const uId = typeof ord.user === "object" ? ord.user?._id : ord.user;
        return uId === userId;
      });
      setOrders(userOrders);
    } catch (err) {
      console.error("Fetch order history failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === "Order") {
      fetchUserOrders();
    }
  }, [isOpen, activeTab, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[400px] bg-[#333333] text-white h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto font-sans">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5">
            <div className="flex items-center gap-2 font-semibold text-lg text-white">
              <ShoppingCart className="w-5 h-5 text-white" />
              <span>Order detail</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#444444] hover:bg-[#555555] flex items-center justify-center text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart / Order Switcher Tab */}
          <div className="flex bg-white rounded-full p-1 mb-6">
            <button
              onClick={() => setActiveTab("Cart")}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
                activeTab === "Cart"
                  ? "bg-[#EF4444] text-white"
                  : "bg-transparent text-gray-700 hover:text-black"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveTab("Order")}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
                activeTab === "Order"
                  ? "bg-[#EF4444] text-white"
                  : "bg-transparent text-gray-700 hover:text-black"
              }`}
            >
              Order
            </button>
          </div>

          {/* Active Tab: ORDER */}
          {activeTab === "Order" && (
            <div className="bg-white text-gray-900 rounded-[24px] p-5 shadow-sm">
              <h3 className="font-bold text-lg text-black mb-4">
                Order history
              </h3>

              {loading ? (
                <div className="py-12 text-center text-sm text-gray-400">
                  Loading order history...
                </div>
              ) : orders.length > 0 ? (
                <div className="flex flex-col max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
                  {orders.map((order, idx) => (
                    <React.Fragment key={order._id || idx}>
                      <div className="flex flex-col gap-2 py-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-base text-black">
                            ${Number(order.totalPrice || 0).toFixed(2)}{" "}
                            <span className="text-black font-bold">
                              (#{order._id?.slice(-5) || "20156"})
                            </span>
                          </span>

                          <span
                            className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                              order.status === "DELIVERED" ||
                              order.status === "Delivered"
                                ? "bg-[#F4F4F5] text-gray-800 border-transparent"
                                : "bg-white text-red-500 border-red-400"
                            }`}
                          >
                            {order.status === "DELIVERED" ||
                            order.status === "Delivered"
                              ? "Delivered"
                              : "Pending"}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                          {order.foodOrderItems?.map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Utensils className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="truncate">
                                  {item.food?.foodName ||
                                    item.food?.name ||
                                    "Dish"}
                                </span>
                              </div>
                              <span className="text-gray-600 font-medium ml-2">
                                x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>
                            {order.createdAt
                              ? format(new Date(order.createdAt), "yyyy/MM/dd")
                              : "-"}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 text-xs text-gray-400">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2 leading-relaxed">
                            {order.address || "No address provided"}
                          </span>
                        </div>
                      </div>

                      {idx < orders.length - 1 && (
                        <div className="border-b border-dashed border-gray-300 my-3" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <span className="text-lg">🍔</span>
                  </div>
                  <p className="font-bold text-sm text-black mb-1">
                    No Orders Yet?
                  </p>
                  <p className="text-xs text-gray-400 max-w-[200px]">
                    You haven't placed any orders yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Active Tab: CART */}
          {activeTab === "Cart" && (
            <div className="bg-white text-gray-900 rounded-[24px] p-5">
              <h3 className="font-bold text-lg text-black mb-4">My cart</h3>
              <div className="py-10 text-center text-xs text-gray-400">
                Your cart is empty.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
