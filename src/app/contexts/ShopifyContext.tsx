"use client";

import React, { createContext, useContext } from "react";
import useSWR from "swr";
import { ShopifyInterface } from "../api/shopify/route";

interface ShopifyContextType {
  data: ShopifyInterface | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

interface ShopifyProviderProps {
  children: React.ReactNode;
  startDate?: string;
  endDate?: string;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const ShopifyContextProvider = ({
  children,
  startDate,
  endDate,
}: ShopifyProviderProps) => {
  // Construction des query params si les dates sont fournies
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.append("firstDate", startDate);
  if (endDate) queryParams.append("lastDate", endDate);
  const queryString = queryParams.toString();
  const url = `/api/shopify${queryString ? "?" + queryString : ""}`;

  const { data, error } = useSWR<ShopifyInterface>(url, fetcher, {
    refreshInterval: 30000,
  });

  return (
    <ShopifyContext.Provider value={{ data, error }}>
      {children}
    </ShopifyContext.Provider>
  );
};

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error("useShopify must be used within a ShopifyContextProvider");
  }
  return context;
};

export default ShopifyContextProvider;
