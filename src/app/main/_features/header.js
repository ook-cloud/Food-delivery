"use client";
import { HeaderLogo } from "../../_icons/HeaderLogo";
import { LocationLogo } from "../../_icons/LocationLogo";
import { ChevronRightLogo } from "../../_icons/ChevronRightLogo";
import { ShopCartLogo } from "../../_icons/ShopCartLogo";
import { UserLogo } from "../../_icons/UserLogo";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  X,
  Minus,
  PlusIcon,
  Utensils,
  Clock,
  MapPin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { server } from "@/app/_api/api";
import { useCart } from "@/providers/CartProvider";
import { format } from "date-fns";

export const Header = () => {
  const router = useRouter();
  const jumpToLogin = () => router.push("/login");

  const [adress, setAdress] = useState(false);
  const [adressSave, setAdressSave] = useState("");
  const [sectionCart, setSectionCart] = useState(false);
  const [localData, setLocalData] = useState([]);
  const [cartOrOrder, setCartOrOrder] = useState(1); // 1 = Cart, 2 = Order
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const { order, setOrder } = useCart();

  const handleCart = () => setSectionCart(true);
  const handleCartCloser = () => setSectionCart(false);
  const adressHandler = () => setAdress(true);
  const adressHandlerCloser = () => setAdress(false);

  // Cart Local storage sync
  useEffect(() => {
    if (order && Array.isArray(order)) {
      setLocalData(order);
    } else {
      try {
        const result = JSON.parse(localStorage.getItem("CartDishes")) || [];
        setLocalData(result);
      } catch {
        setLocalData([]);
      }
    }
  }, [order]);

  const getLocalDishes = () => {
    try {
      const result = JSON.parse(localStorage.getItem("CartDishes")) || [];
      setLocalData(result);
    } catch {
      setLocalData([]);
    }
  };

  useEffect(() => {
    getLocalDishes();
    const savedLocation = localStorage.getItem("Location") || "";
    setAdressSave(savedLocation);
  }, []);

  // Хэрэглэгч Order таб дээр дарах үед захиалгын түүхийг API-аас авна
  const fetchUserOrders = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) return;

    try {
      setLoadingOrders(true);
      const user = JSON.parse(userString);
      const userId = user._id || user.id;

      const response = await server.get("/order/get");
      const allOrders = response.data.orders || [];

      // Зөвхөн тухайн хэрэглэгчийн захиалгуудыг шүүж авна
      const myOrders = allOrders.filter((ord) => {
        const uId = typeof ord.user === "object" ? ord.user?._id : ord.user;
        return uId === userId;
      });

      setUserOrders(myOrders);
    } catch (err) {
      console.error("Failed to fetch user orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (sectionCart && cartOrOrder === 2) {
      fetchUserOrders();
    }
  }, [sectionCart, cartOrOrder]);

  const adressSubmit = () => {
    localStorage.setItem("Location", adressSave);
    setAdress(false);
  };

  const updateQuantity = (dishId, delta) => {
    const updated = localData
      .map((item) => {
        const id = item._id || item.id;
        if (id === dishId) {
          const newNumber = (Number(item.number) || 1) + delta;
          return newNumber > 0 ? { ...item, number: newNumber } : null;
        }
        return item;
      })
      .filter(Boolean);

    setLocalData(updated);
    localStorage.setItem("CartDishes", JSON.stringify(updated));
    setOrder(updated);
  };

  const removeDish = (dishId) => {
    const updated = localData.filter(
      (item) => (item._id || item.id) !== dishId,
    );
    setLocalData(updated);
    localStorage.setItem("CartDishes", JSON.stringify(updated));
    setOrder(updated);
  };

  const subtotal = (localData || []).reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.number) || 1),
    0,
  );
  const shipping = subtotal > 0 ? 0.99 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (localData.length === 0) return alert("Your cart is empty!");
    if (!adressSave) {
      alert("Please add a delivery address!");
      setAdress(true);
      return;
    }

    const userString = localStorage.getItem("user");
    if (!userString) {
      alert("You must be logged in to place an order.");
      jumpToLogin();
      return;
    }

    const userid = JSON.parse(userString);

    const orderPayload = {
      user: userid._id,
      totalPrice: total,
      address: adressSave,
      foodOrderItems: localData.map((item) => ({
        food: item._id || item.id,
        quantity: item.number || 1,
      })),
      status: "PENDING",
    };

    try {
      const response = await server.post("/order/post", orderPayload);

      if (response.status === 201 || response.status === 200) {
        alert("Order placed successfully!");
        setLocalData([]);
        localStorage.removeItem("CartDishes");
        setOrder([]);
        setCartOrOrder(2); // Захиалсны дараа шууд Order таб руу шилжүүлнэ
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(error.response?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="w-full h-17 flex items-center justify-between py-3 px-22 bg-[#18181B]">
      {/* Header Logo Section */}
      <div className="w-36.5 h-11 flex gap-3">
        <HeaderLogo />
        <div className="w-22 h-11 flex flex-col">
          <p className="font-inter font-semibold text-[20px] leading-7 text-[#FAFAFA]">
            Nom<span className="text-[#EF4444]">Nom</span>
          </p>
          <p className="font-inter font-normal text-[12px] leading-4 text-[#F4F4F5]">
            Swift delivery
          </p>
        </div>
      </div>

      <div className="w-87.5 h-9 flex justify-between">
        {/* Address Selection Modal Trigger */}
        <div className="w-62.75 h-9 py-2 px-3 gap-1 rounded-full bg-[#FFFFFF] flex items-center relative">
          <LocationLogo />
          <p className="font-inter font-normal text-[#EF4444] text-[12px] leading-4 whitespace-nowrap">
            Delivery address:
          </p>
          <p
            onClick={adressHandler}
            className="font-inter font-normal text-[#71717A] text-[12px] leading-4 cursor-pointer truncate"
          >
            {adressSave || "Add Location"}
          </p>

          {adress && (
            <div className="w-125.5 h-72 flex flex-col rounded-[20px] px-6 py-8 gap-6 bg-[#FFFFFF] shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="w-113.5 h-10 flex justify-between items-center">
                <p className="font-inter font-semibold text-[20px] text-[#09090B] leading-8">
                  Please write your delivery address!
                </p>
                <div
                  onClick={adressHandlerCloser}
                  className="w-10 h-10 rounded-full flex justify-center items-center bg-[#F4F4F5] cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#18181B]" />
                </div>
              </div>
              <textarea
                value={adressSave}
                onChange={(e) => setAdressSave(e.target.value)}
                placeholder="Please share your complete address"
                className="py-2 px-3 w-113.5 h-20 font-inter font-normal text-[#71717A] text-[14px] leading-5 rounded-md border border-solid border-[#E4E4E7]"
              />
              <div className="w-113.5 h-16 flex gap-4 justify-end items-end">
                <Button
                  onClick={adressHandlerCloser}
                  className="w-19.75 h-10 border-[#E4E4E7] bg-[#FFFFFF] font-inter font-medium text-[#18181B] text-[14px] leading-5 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={adressSubmit}
                  className="w-28.75 h-10 bg-[#18181B] font-inter font-medium text-[#FAFAFA] text-[14px] leading-5 rounded-md hover:bg-[#27272a]"
                >
                  Deliver Here
                </Button>
              </div>
            </div>
          )}
          <ChevronRightLogo
            className="cursor-pointer"
            onClick={adressHandler}
          />
        </div>

        {/* Cart Icon Button */}
        <div
          onClick={handleCart}
          className="w-9 h-9 flex rounded-full bg-[#F4F4F5] justify-center items-center cursor-pointer relative"
        >
          <ShopCartLogo />
          {localData.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {localData.length}
            </span>
          )}
        </div>

        {/* ---------------- ORDER DETAIL DRAWER ---------------- */}
        {sectionCart && (
          <div className="h-full w-[400px] rounded-tl-[20px] rounded-bl-[20px] shadow-lg bg-[#333333] gap-6 p-6 fixed top-0 right-0 z-50 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Drawer Header */}
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  <p className="font-inter font-semibold text-white text-[18px]">
                    Order detail
                  </p>
                </div>
                <div
                  onClick={handleCartCloser}
                  className="w-8 h-8 rounded-full bg-[#444444] hover:bg-[#555555] flex items-center justify-center cursor-pointer text-gray-300"
                >
                  <X className="w-4 h-4" />
                </div>
              </div>

              {/* Tab Switcher */}
              <div className="w-full flex p-1 bg-white rounded-full">
                <div
                  onClick={() => setCartOrOrder(1)}
                  className={`w-1/2 py-1.5 text-center rounded-full cursor-pointer font-inter font-semibold text-sm transition-all ${
                    cartOrOrder === 1
                      ? "bg-[#EF4444] text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                >
                  Cart
                </div>
                <div
                  onClick={() => setCartOrOrder(2)}
                  className={`w-1/2 py-1.5 text-center rounded-full cursor-pointer font-inter font-semibold text-sm transition-all ${
                    cartOrOrder === 2
                      ? "bg-[#EF4444] text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                >
                  Order
                </div>
              </div>

              {/* TAB 1: CART CONTAINER */}
              {cartOrOrder === 1 && (
                <>
                  <div className="w-full flex flex-col rounded-[24px] p-5 bg-white shadow-sm gap-4">
                    <p className="font-inter font-bold text-black text-lg">
                      My cart
                    </p>
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                      {localData.length === 0 ? (
                        <p className="text-gray-400 text-center py-8 text-sm">
                          Your cart is empty.
                        </p>
                      ) : (
                        localData.map((data) => {
                          const id = data._id || data.id;
                          return (
                            <div
                              key={id}
                              className="w-full flex flex-col gap-3"
                            >
                              <div className="w-full flex gap-3">
                                <img
                                  src={data.image}
                                  alt={data.foodName}
                                  className="w-20 h-20 rounded-xl object-cover"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                      <p className="font-bold text-[#EF4444] text-sm">
                                        {data.foodName}
                                      </p>
                                      <p className="text-[#71717A] text-[11px] line-clamp-1">
                                        {data.ingredients}
                                      </p>
                                    </div>
                                    <div
                                      onClick={() => removeDish(id)}
                                      className="w-6 h-6 rounded-full justify-center items-center flex border border-[#EF4444] cursor-pointer hover:bg-red-50"
                                    >
                                      <X className="w-3.5 h-3.5 text-[#EF4444]" />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-1">
                                    <div className="flex items-center gap-2">
                                      <div
                                        onClick={() => updateQuantity(id, -1)}
                                        className="w-6 h-6 rounded-full flex justify-center items-center border border-[#E4E4E7] cursor-pointer hover:bg-gray-100"
                                      >
                                        <Minus className="w-3 h-3 text-[#18181B]" />
                                      </div>
                                      <p className="font-bold text-black text-xs">
                                        {data.number}
                                      </p>
                                      <div
                                        onClick={() => updateQuantity(id, 1)}
                                        className="w-6 h-6 rounded-full flex justify-center items-center border border-[#E4E4E7] cursor-pointer hover:bg-gray-100"
                                      >
                                        <PlusIcon className="w-3 h-3 text-[#18181B]" />
                                      </div>
                                    </div>

                                    <p className="font-bold text-black text-sm">
                                      $
                                      {(
                                        (Number(data.price) || 0) *
                                        (Number(data.number) || 1)
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full border-b border-dashed border-gray-200"></div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="w-full flex flex-col gap-1.5 mt-2">
                      <p className="font-bold text-black text-sm">
                        Delivery location
                      </p>
                      <textarea
                        value={adressSave}
                        onChange={(e) => setAdressSave(e.target.value)}
                        placeholder="Please share your complete address"
                        className="w-full h-16 rounded-xl border border-[#E4E4E7] p-2.5 text-xs outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Payment Info Box */}
                  <div className="w-full rounded-[24px] flex flex-col p-5 gap-3 bg-white shadow-sm">
                    <p className="font-bold text-black text-base">
                      Payment info
                    </p>
                    <div className="w-full flex flex-col gap-1.5 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Items</span>
                        <span className="font-bold text-black">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-bold text-black">
                          ${shipping.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-dashed border-gray-200"></div>
                    <div className="flex justify-between text-sm font-bold text-black">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div
                      onClick={handleCheckout}
                      className="w-full py-2.5 rounded-full bg-[#EF4444] flex justify-center items-center font-semibold text-xs text-white cursor-pointer hover:bg-red-600 transition-colors mt-1"
                    >
                      Checkout
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: ORDER HISTORY CONTAINER */}
              {cartOrOrder === 2 && (
                <div className="w-full bg-white text-gray-900 rounded-[24px] p-5 shadow-sm">
                  <h3 className="font-bold text-lg text-black mb-4">
                    Order history
                  </h3>

                  {loadingOrders ? (
                    <div className="py-12 text-center text-sm text-gray-400">
                      Loading order history...
                    </div>
                  ) : userOrders.length > 0 ? (
                    <div className="flex flex-col max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
                      {userOrders.map((ord, idx) => (
                        <React.Fragment key={ord._id || idx}>
                          <div className="flex flex-col gap-2 py-2">
                            {/* Order Header */}
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-base text-black">
                                ${Number(ord.totalPrice || 0).toFixed(2)}{" "}
                                <span className="text-black font-bold">
                                  (#{ord._id?.slice(-5) || "20156"})
                                </span>
                              </span>

                              <span
                                className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                                  ord.status === "DELIVERED" ||
                                  ord.status === "Delivered"
                                    ? "bg-[#F4F4F5] text-gray-800 border-transparent"
                                    : "bg-white text-red-500 border-red-400"
                                }`}
                              >
                                {ord.status === "DELIVERED" ||
                                ord.status === "Delivered"
                                  ? "Delivered"
                                  : "Pending"}
                              </span>
                            </div>

                            {/* Food items */}
                            <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                              {ord.foodOrderItems?.map((item, i) => (
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

                            {/* Date */}
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span>
                                {ord.createdAt
                                  ? format(
                                      new Date(ord.createdAt),
                                      "yyyy/MM/dd",
                                    )
                                  : "-"}
                              </span>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-2 text-xs text-gray-400">
                              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2 leading-relaxed">
                                {ord.address || "No address provided"}
                              </span>
                            </div>
                          </div>

                          {idx < userOrders.length - 1 && (
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
            </div>
          </div>
        )}

        {/* User Login Icon */}
        <div
          className="w-9 h-9 flex rounded-full bg-[#EF4444] justify-center items-center cursor-pointer"
          onClick={jumpToLogin}
        >
          <UserLogo />
        </div>
      </div>
    </div>
  );
};
