"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getSalaryByPerson } from "../../utils/salary";

export interface Salary {
  agencySalary: number;
  personSalary: number;
  previsionalSalary: number;
}

interface SalaryContextType {
  totalMetaSpend: number;
  totalShopifySales: number;
  salary: Salary;
  setTotalMetaSpend: (spend: number) => void;
  setTotalShopifySales: (sales: number) => void;
}

const SalaryContext = createContext<SalaryContextType | undefined>(undefined);

export const SalaryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalMetaSpend, setTotalMetaSpend] = useState<number>(0);
  const [totalShopifySales, setTotalShopifySales] = useState<number>(0);
  const [salary, setSalary] = useState<Salary>({
    agencySalary: 0,
    personSalary: 0,
    previsionalSalary: 0,
  });

  useEffect(() => {
    const calculatedSalary = getSalaryByPerson(
      totalShopifySales,
      totalMetaSpend
    );
    setSalary(calculatedSalary);
  }, [totalMetaSpend, totalShopifySales]);

  return (
    <SalaryContext.Provider
      value={{
        totalMetaSpend,
        totalShopifySales,
        salary,
        setTotalMetaSpend,
        setTotalShopifySales,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context) {
    throw new Error("useSalary must be used within a SalaryContextProvider");
  }
  return context;
};

export default SalaryContextProvider;
