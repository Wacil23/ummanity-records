"use client";

import React, { createContext, useContext } from "react";
import useSWR from "swr";
import { InsightsInterface } from "../api/insights/route";

interface MetaContextType {
  data: InsightsInterface | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const MetaContext = createContext<MetaContextType | undefined>(undefined);
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const MetaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, error } = useSWR<InsightsInterface>("/api/insights", fetcher, {
    refreshInterval: 30000,
  });

  return (
    <MetaContext.Provider value={{ data, error }}>
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error("useMeta must be used within a MetaContextProvider");
  }
  return context;
};

export default MetaContextProvider;
