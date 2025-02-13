"use client";

import React, { createContext, useContext } from "react";
import { ShopifyInterface } from "../api/shopify/route";
import useSWR from "swr";

interface ShopifyContextType {
  data: ShopifyInterface | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ShopifyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, error } = useSWR<ShopifyInterface>("/api/shopify", fetcher, {
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
