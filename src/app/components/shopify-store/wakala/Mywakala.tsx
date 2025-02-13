"use client";
import React from "react";
import AnimatedNumber from "../../ui/animated/AnimatedNumber";

interface MywakalaProps {
  totalSalesWAKFormatted: string;
}

const Mywakala: React.FC<MywakalaProps> = ({ totalSalesWAKFormatted }) => {
  const totalSalesWAK = Number(
    totalSalesWAKFormatted.replace(/\s/g, "").replace(",", ".").replace("€", "")
  );
  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm md:text-xl flex flex-col gap-2 font-medium">
        My Wakala
        <AnimatedNumber value={Number(totalSalesWAK)} />
      </p>
    </div>
  );
};

export default Mywakala;
