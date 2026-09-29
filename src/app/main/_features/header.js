"use client";
import { HeaderLogo } from "../../_icons/HeaderLogo";
import { LocationLogo } from "../../_icons/LocationLogo";
import { ChevronRightLogo } from "../../_icons/ChevronRightLogo";
import { ShopCartLogo } from "../../_icons/ShopCartLogo";
import { UserLogo } from "../../_icons/UserLogo";
import { useRouter } from "next/navigation";
import { ShoppingCart, X, Minus, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { server } from "@/app/_api/api";

export const Header = () => {
  const router = useRouter();
  const jumpToLogin = () => router.push("/login");

  const [adress, setAdress] = useState(false);
  const [adressSave, setAdressSave] = useState("");
  const [sectionCart, setSectionCart] = useState(false);
  const [localData, setLocalData] = useState([]);
  const [cartOrOrder, setCartOrOrder] = useState(1);

  const handleCart = () => setSectionCart(true);
  const handleCartCloser = () => setSectionCart(false);
  const adressHandler = () => setAdress(true);
  const adressHandlerCloser = () => setAdress(false);

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
  };

  const removeDish = (dishId) => {
    const updated = localData.filter(
      (item) => (item._id || item.id) !== dishId,
    );
    setLocalData(updated);
    localStorage.setItem("CartDishes", JSON.stringify(updated));
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
    };

    try {
      const response = await server.post("/order/post", orderPayload);

      if (response.status === 201 || response.status === 200) {
        alert("Order placed successfully!");
        setLocalData([]);
        localStorage.removeItem("CartDishes");
        setSectionCart(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(error.response?.data?.message || "Failed to place order.");
    }
  };
  return (
    <div className="w-full h-17 flex items-center justify-between py-3 px-22 bg-[#18181B]">
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

        {sectionCart && (
          <div className="h-full w-4/12 rounded-tl-[20px] rounded-bl-[20px] shadow-lg bg-[#404040] gap-6 p-8 fixed top-0 right-0 z-50 flex flex-col">
            <div className="w-full h-9 flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                <ShoppingCart className="w-6 h-6 text-[#E4E4E7]" />
                <p className="font-inter font-semibold text-[#FAFAFA] text-[20px] leading-7">
                  Order detail
                </p>
              </div>
              <div
                onClick={handleCartCloser}
                className="w-9 h-9 rounded-full border border-solid border-[#E4E4E7] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-[#E4E4E7]" />
              </div>
            </div>

            <div className="w-full h-11 flex p-1 gap-2 bg-[#FFFFFF] rounded-full">
              <div
                onClick={() => setCartOrOrder(1)}
                className={`w-1/2 h-9 rounded-full flex items-center justify-center cursor-pointer font-inter font-normal text-[18px] leading-7 transition-colors ${
                  cartOrOrder === 1
                    ? "bg-[#EF4444] text-[#FAFAFA]"
                    : "bg-[#FFFFFF] text-[#09090B]"
                }`}
              >
                Cart
              </div>
              <div
                onClick={() => setCartOrOrder(2)}
                className={`w-1/2 h-9 rounded-full flex items-center justify-center cursor-pointer font-inter font-normal text-[18px] leading-7 transition-colors ${
                  cartOrOrder === 2
                    ? "bg-[#EF4444] text-[#FAFAFA]"
                    : "bg-[#FFFFFF] text-[#09090B]"
                }`}
              >
                Order
              </div>
            </div>

            <div className="w-full max-h-1/2 flex flex-col rounded-[20px] justify-between p-4 bg-[#FFFFFF] overflow-y-auto flex-1">
              <div className="flex flex-col gap-5">
                <p className="font-inter font-semibold text-[#71717A] text-[20px] leading-7">
                  My cart
                </p>
                <div className="flex flex-col gap-5">
                  {localData.length === 0 ? (
                    <p className="text-gray-400 text-center py-6">
                      Your cart is empty.
                    </p>
                  ) : (
                    localData.map((data) => {
                      const id = data._id || data.id;
                      return (
                        <div key={id} className="w-full flex flex-col gap-5">
                          <div className="w-full flex gap-3">
                            <img
                              src={data.image}
                              alt={data.foodName}
                              className="w-24 h-24 rounded-xl object-cover"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                  <p className="font-inter font-bold text-[#EF4444] text-[16px] leading-6">
                                    {data.foodName}
                                  </p>
                                  <p className="font-inter font-normal text-[#09090B] text-[12px] leading-4 line-clamp-1">
                                    {data.ingredients}
                                  </p>
                                </div>
                                <div
                                  onClick={() => removeDish(id)}
                                  className="w-8 h-8 rounded-full justify-center items-center flex border border-solid border-[#EF4444] cursor-pointer hover:bg-red-50"
                                >
                                  <X className="w-4 h-4 text-[#EF4444]" />
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-3">
                                  <div
                                    onClick={() => updateQuantity(id, -1)}
                                    className="w-8 h-8 rounded-full flex justify-center items-center border-[#E4E4E7] border border-solid cursor-pointer hover:bg-gray-100"
                                  >
                                    <Minus className="w-3.5 h-3.5 text-[#18181B]" />
                                  </div>
                                  <p className="font-inter font-semibold text-[#09090B] text-[16px]">
                                    {data.number}
                                  </p>
                                  <div
                                    onClick={() => updateQuantity(id, 1)}
                                    className="w-8 h-8 rounded-full flex justify-center items-center border-[#E4E4E7] border border-solid cursor-pointer hover:bg-gray-100"
                                  >
                                    <PlusIcon className="w-3.5 h-3.5 text-[#18181B]" />
                                  </div>
                                </div>

                                <p className="font-inter font-semibold text-[#09090B] text-[18px]">
                                  $
                                  {(
                                    (Number(data.price) || 0) *
                                    (Number(data.number) || 1)
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-full border-b border-dashed border-[#09090B40]"></div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 mt-8">
                <p className="font-inter font-semibold text-[#71717A] text-[20px] leading-7">
                  Delivery location
                </p>
                <textarea
                  value={adressSave}
                  onChange={(e) => setAdressSave(e.target.value)}
                  placeholder="Please share your complete address"
                  className="w-full h-20 rounded-md border border-solid border-[#E4E4E7] py-2 px-3 shadow-sm text-sm"
                />
              </div>
            </div>

            <div className="w-full rounded-[20px] flex flex-col p-4 gap-4 bg-[#FFFFFF]">
              <p className="font-inter font-semibold text-[#71717A] text-[20px] leading-7">
                Payment info
              </p>
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="font-inter font-normal text-[16px] leading-7 text-[#71717A]">
                    Items
                  </p>
                  <p className="font-inter font-bold text-[#09090B] leading-7 text-[16px]">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-inter font-normal text-[16px] leading-7 text-[#71717A]">
                    Shipping
                  </p>
                  <p className="font-inter font-bold text-[#09090B] leading-7 text-[16px]">
                    ${shipping.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="w-full border-b border-dashed border-[#09090B40]"></div>
              <div className="flex justify-between">
                <p className="font-inter font-normal text-[16px] leading-7 text-[#71717A]">
                  Total
                </p>
                <p className="font-inter font-bold text-[#09090B] leading-7 text-[16px]">
                  ${total.toFixed(2)}
                </p>
              </div>
              <div
                onClick={handleCheckout}
                className="w-full h-11 rounded-full bg-[#EF4444] flex justify-center items-center font-inter font-medium leading-5 text-[14px] text-[#FAFAFA] cursor-pointer hover:bg-red-600 transition-colors"
              >
                Checkout
              </div>
            </div>
          </div>
        )}

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
