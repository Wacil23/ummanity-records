import React, { useEffect } from "react";
import Mysadaka from "./mysadaka/Mysadaka";
import Image from "next/image";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { IoShareSocialSharp } from "react-icons/io5";
import Mywakala from "./wakala/Mywakala";
import { useShopify } from "@/app/contexts/ShopifyContext";
import { useSalary } from "@/app/contexts/SalaryContext";
import AnimatedNumber from "../ui/animated/AnimatedNumber";
import Skeleton from "../ui/skeleton/Skeleton";

const ShopifyStore = () => {
  const { data } = useShopify();
  const { setTotalShopifySales } = useSalary();

  useEffect(() => {
    setTotalShopifySales(data?.totalSales ?? 0);
  }, [data?.totalSales, setTotalShopifySales]);

  return (
    <div className="flex flex-col rounded-md shadow-sm justify-between">
      <div className="flex gap-4 py-4 px-8">
        <Image
          src="https://cdn.worldvectorlogo.com/logos/shopify.svg"
          alt="Shopify"
          width={40}
          height={40}
          className="  min-w-11  rounded-md p-2"
        />
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xl font-bold text-[#5e8e3e]">Shopify</p>
          <div className="flex flex-col md:flex-row gap-1 md:gap-4">
            <div className="flex gap-1 items-center">
              <IoShareSocialSharp size={20} className=" p-1 text-[#5e8e3e]" />
              <p className="text-xs md:text-sm text-gray-500">Social Media</p>
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1 items-center">
                <PiPlugsConnectedFill
                  size={20}
                  className=" p-1 text-[#5e8e3e]"
                />
                <p className="text-xs md:text-sm text-gray-500">
                  Connected Account : 2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full  px-8 py-4 gap-6">
        <Skeleton
          loading={!data}
          animationSpeed={0.5}
          width="w-full"
          height="h-10"
        >
          <div className="flex justify-between gap-2">
            <Mysadaka
              totalSalesMYSFormatted={data?.totalSalesMYSFormatted ?? ""}
            />
            <Mywakala
              totalSalesWAKFormatted={data?.totalSalesWAKFormatted ?? ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-xl">CA total</p>
            <AnimatedNumber value={Number(data?.totalSales ?? 0)} />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default ShopifyStore;
