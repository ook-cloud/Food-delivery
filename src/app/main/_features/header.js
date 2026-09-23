"use client";
import { HeaderLogo } from "../../_icons/HeaderLogo";
import { LocationLogo } from "../../_icons/LocationLogo";
import { ChevronRightLogo } from "../../_icons/ChevronRightLogo";
import { ShopCartLogo } from "../../_icons/ShopCartLogo";
import { UserLogo } from "../../_icons/UserLogo";
import { useRouter } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { PlusIcon } from "lucide-react";
export const Header = () => {
  const router = useRouter();
  const jumpToLogin = () => router.push("/login");
  const [adress, setAdress] = useState(false);
  const [adressSave, setAdressSave] = useState("");
  const [sectionCart, setSectionCart] = useState(false);
  const [localData, setLocalData] = useState([]);
  const handleCart = () => {
    setSectionCart(true);
  };
  const handleCartCloser = () => {
    setSectionCart(false);
  };
  const adressHandler = () => {
    setAdress(true);
  };
  const adressHandlerCloser = () => {
    setAdress(false);
  };
  const getLocalDishes = () => {
    const result = JSON.parse(localStorage.getItem("CartDishes"));
    setLocalData(result);
  };
  useEffect(() => {
    getLocalDishes();
  }, [sectionCart]);
  const adressSubmit = () => {
    localStorage.setItem("Location", adressSave);
    setAdress(false);
  };
  console.log(localData);
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
        <div className="w-62.75 h-9 py-2 px-3 gap-1 rounded-full bg-[#FFFFFF] flex items-center">
          <LocationLogo />
          <p className="font-inter font-normal text-[#EF4444] text-[12px] leading-4">
            Delivery address:
          </p>
          <p className="font-inter font-normal text-[##71717A] text-[12px] leading-4 cursor-pointer">
            Add Location
          </p>
          {adress && (
            <div className="w-125.5 h-72 flex flex-col rounded-[20px] px-6 py-8 gap-6 bg-[#FFFFFF] shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="w-113.5 h-10 flex gap-7">
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
              ></textarea>
              <div className="w-113.5 h-16 flex gap-4 justify-end items-end">
                <Button
                  onClick={adressHandlerCloser}
                  className="w-19.75 h-10 border-[#E4E4E7] bg-[#FFFFFF] font-inter font-medium text-[#18181B] text-[14px] leading-5 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  onClick={adressSubmit}
                  className="w-28.75 h-10 bg-[#18181B] font-inter font-medium text-[#FAFAFA] text-[14px] leading-5 rounded-md"
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
          className="w-9 h-9 flex rounded-full bg-[#F4F4F5] justify-center items-center cursor-pointer"
        >
          <ShopCartLogo />
        </div>
        {sectionCart && (
          <div className="h-full w-4/12 rounded-tl-[20px] rounded-bl-[20px] shadow-lg bg-[#404040] gap-6 p-8 fixed top-0 right-0 z-50 flex flex-col">
            <div className="w-full h-9 flex items-center justify-between">
              <div className="flex items-center gap-0.5 ">
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
              <div className="w-1/2 h-9 bg-[#EF4444] rounded-full flex items-center justify-center cursor-pointer">
                Cart
              </div>
              <div className="w-1/2 h-9 bg-[#FFFFFF] rounded-full flex items-center justify-center cursor-pointer">
                Order
              </div>
            </div>
            <div className="w-full max-h-1/2 flex flex-col rounded-[20px] justify-between p-4 bg-[#FFFFFF] overflow-y-auto flex-1">
              <div className="flex flex-col gap-5">
                <p className="font-inter font-semibold text-[#71717A] text-[20px] leading-7">
                  My cart
                </p>
                <div className="flex flex-col gap-5 ">
                  {localData.map((data) => (
                    <div
                      key={data._id}
                      className="w-full h-35 flex flex-col gap-5"
                    >
                      <div className="w-full h-30 flex justify-around">
                        <img
                          src={data.image}
                          className="w-31 h-30 rounded-xl"
                        />
                        <div className="w-76.25 h-30 flex flex-col gap-6">
                          <div className="w-76.5 h-15 flex justify-between">
                            <div className="flex flex-col w-60.75 h-15">
                              <p className="font-inter font-bold text-[#EF4444] text-[16px] leading-7">
                                {data.foodName}
                              </p>
                              <p className="font-inter font-normal text-[#09090B] text-[12px] leading-4">
                                {data.ingredients}
                              </p>
                            </div>
                            <div className="w-9 h-9 rounded-full justify-center items-center flex border border-solid border-[#EF4444] cursor-pointer">
                              <X className="w-4 h-4 text-[#EF4444]" />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div
                                // onClick={numberMinus}
                                className="w-11 h-11 rounded-full flex justify-center items-center border-[#E4E4E7] border border-solid cursor-pointer"
                              >
                                <Minus className="w-4 h-4 text-[#18181B]" />
                              </div>
                              <p className="font-inter font-semibold text-[#09090B] text-[18px] leading-7">
                                {/* {number} */}1
                              </p>
                              <div
                                // onClick={numberPlus}
                                className="w-11 h-11 rounded-full flex justify-center items-center border-[#E4E4E7] border border-solid cursor-pointer"
                              >
                                <PlusIcon className="w-4 h-4 text-[#18181B]" />
                              </div>
                            </div>

                            <p className="font-inter font-semibold text-[#09090B] text-[24px] leading-6">
                              ${data.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-0 border border-dashed border-[#09090B80]"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-29 flex flex-col gap-2 mt-14">
                <p className="font-inter font-semibold text-[#71717A] text-[20px] leading-7">
                  Delivery location
                </p>
                <textarea
                  placeholder="Please share your complete address"
                  className="w-full h-20 rounded-md border border-solid border-[#E4E4E7] py-2 px-3 shadow-sm"
                ></textarea>
              </div>
            </div>
            <div className="w-full h-69 rounded-[20px] flex flex-col p-4 gap-5 bg-[#FFFFFF]">
              <p className="font-inter font-semibold text-[#71717A] text-[20px] leading-7">
                Payment info
              </p>
              <div className="w-full h-16 flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className="font-inter font-normal text-[16px] leading-7 text-[#71717A] ">
                    Items
                  </p>
                  <p className="font-inter font-bold text-[#09090B] leading-7 text-[16px]">
                    $25.98
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-inter font-normal text-[16px] leading-7 text-[#71717A] ">
                    Shipping
                  </p>
                  <p className="font-inter font-bold text-[#09090B] leading-7 text-[16px]">
                    $0.99
                  </p>
                </div>
              </div>
              <div className="w-full border border-dashed border-[#09090B80]"></div>
              <div className="flex justify-between">
                <p className="font-inter font-normal text-[16px] leading-7 text-[#71717A] ">
                  Total
                </p>
                <p className="font-inter font-bold text-[#09090B] leading-7 text-[16px]">
                  $26.97
                </p>
              </div>
              <div className="w-full h-11 rounded-full bg-[#EF4444] flex justify-center items-center font-inter font-medium leading-5 text-[14px] text-[#FAFAFA] cursor-pointer">
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
