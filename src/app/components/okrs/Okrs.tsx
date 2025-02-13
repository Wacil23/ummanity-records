import React from "react";
import {
  ShopifyContextProvider,
  useShopify,
} from "@/app/contexts/ShopifyContext";
import Skeleton from "../ui/skeleton/Skeleton";
import RingProgress from "../ui/progress/RingProgress";

const OkrsContent = () => {
  const { data } = useShopify();
  const totalShopifySales = data?.totalSales || 0;
  const totalShopifySalesFormatted = totalShopifySales.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  const percentage = (totalShopifySales / 2500000) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-2">
        <h2 className="text-lg font-semibold">Objectif Q1</h2>
        <p className="text-sm font-medium text-gray-500">
          Atteindre 2.5M de CA
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton loading={!data} className="h-4 w-full">
          <p className="font-semibold">
            Total Q1 : {totalShopifySalesFormatted}
          </p>
          <div className="flex flex-col  items-start gap-3">
            <p>Progression : {percentage.toFixed(2)}/100%</p>
            <RingProgress progress={percentage} />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

const Okrs = () => {
  return (
    <ShopifyContextProvider startDate="2025-01-01">
      <OkrsContent />
    </ShopifyContextProvider>
  );
};

export default Okrs;
