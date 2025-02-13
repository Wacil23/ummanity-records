"use client";

import React from "react";
import { InsightsClient } from "../insights/Insights";
import ShopifyStore from "../shopify-store/ShopifyStore";
import SalaryContextProvider from "@/app/contexts/SalaryContext";
import SalaryClient from "../salary/SalaryClient";
import Okrs from "../okrs/Okrs";

const SocialMedia = () => {
  return (
    <SalaryContextProvider>
      <SalaryClient />
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6  justify-between">
        <div className="md:w-1/2">
          <InsightsClient />
        </div>
        <div className="md:w-1/2">
          <ShopifyStore />
        </div>
      </div>
      <Okrs />
    </SalaryContextProvider>
  );
};

export default SocialMedia;
