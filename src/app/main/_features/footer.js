import { FacebookIcon } from "../../_icons/FacebookIcon";
import { HeaderLogo } from "../../_icons/HeaderLogo";
import { InstagramIcon } from "../../_icons/InstagramIcon";
export const Footer = () => {
  return (
    <div className="w-full h-193.75 flex flex-col bg-[#18181B] items-center">
      <div className="w-full h-23 bg-[#EF4444] flex gap-8.5 items-center mt-15 px-24.5">
        <p className="text-[#FAFAFA] text-[30px] leading-9 font-inter font-semibold">
          Fresh fast delivered
        </p>
        <p className="text-[#FAFAFA] text-[30px] leading-9 font-inter font-semibold">
          Fresh fast delivered
        </p>
        <p className="text-[#FAFAFA] text-[30px] leading-9 font-inter font-semibold">
          Fresh fast delivered
        </p>
        <p className="text-[#FAFAFA] text-[30px] leading-9 font-inter font-semibold">
          Fresh fast delivered
        </p>
        <p className="text-[#FAFAFA] text-[30px] leading-9 font-inter font-semibold">
          Fresh fast delivered
        </p>
      </div>
      <div className="w-7xl h-57 flex gap-55 mt-19">
        <div className="w-22 h-[93.7px] flex flex-col gap-[12.41px] items-center">
          <HeaderLogo />
          <div className="flex flex-col items-center">
            <p className="font-inter font-semibold text-[20px] leading-7 text-[#FAFAFA]">
              Nom<span className="text-[#EF4444]">Nom</span>
            </p>
            <p className="font-inter font-normal text-[12px] leading-4 text-[#F4F4F5]">
              Swift delivery
            </p>
          </div>
        </div>
        <div className="w-194.5 h-57 flex gap-28">
          <div className="w-30.5 h-37 flex flex-col gap-4">
            <p className="font-inter font-normal text-[#71717A] text-[16px] leading-7">
              NOMNOM
            </p>
            <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
              Home
            </p>
            <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
              Contact us
            </p>
            <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
              Delivery zone
            </p>
          </div>
          <div className="w-[320px] h-57 flex gap-14">
            <div className="w-33 h-57 flex flex-col gap-4">
              <p className="font-inter font-normal text-[#71717A] text-[16px] leading-7">
                MENU
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Appetizers
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Salads
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Pizzas
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Main dishes
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Desserts
              </p>
            </div>
            <div className="w-33 h-57 flex flex-col gap-4">
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6 mt-11">
                Side dish
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Brunch
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Desserts
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Beverages
              </p>
              <p className="font-inter font-normal text-[#FAFAFA] text-[16px] leading-6">
                Fish & Sea foods
              </p>
            </div>
          </div>
          <div className="w-30.5 h-20.25 flex flex-col gap-4">
            <p className="font-inter font-normal text-[#71717A] text-[16px] leading-7">
              FOLLOW US
            </p>
            <div className="w-18 h-9.25 flex gap-4 items-center">
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-26 w-7xl h-21 flex border-t border-t-solid border-t-[#F4F4F566] gap-12 items-center">
        <p className="font-inter font-normal text-[#71717A] text-[14px] leading-5">
          Copy right 2024©Nomnom LLC
        </p>
        <p className="font-inter font-normal text-[#71717A] text-[14px] leading-5">
          Privacy policy
        </p>
        <p className="font-inter font-normal text-[#71717A] text-[14px] leading-5">
          Terms and conditoin
        </p>
        <p className="font-inter font-normal text-[#71717A] text-[14px] leading-5">
          Cookie policy
        </p>
      </div>
    </div>
  );
};
