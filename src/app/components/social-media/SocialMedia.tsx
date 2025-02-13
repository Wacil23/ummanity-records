"use client";

import React from "react";
import { InsightsClient } from "../insights/Insights";
import ShopifyStore from "../shopify-store/ShopifyStore";
import SalaryContextProvider from "@/app/contexts/SalaryContext";
import SalaryClient from "../salary/SalaryClient";

const SocialMedia = () => {
  return (
    <SalaryContextProvider>
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="md:w-1/2">
          <InsightsClient />
        </div>
        <div className="md:w-1/2">
          <ShopifyStore />
        </div>
      </div>
      <SalaryClient />
    </SalaryContextProvider>
  );
};

export default SocialMedia;
