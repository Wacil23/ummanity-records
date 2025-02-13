"use client";
import AnimatedNumber from "../../ui/animated/AnimatedNumber";

interface MysadakaProps {
  totalSalesMYSFormatted: string;
}

const Mysadaka: React.FC<MysadakaProps> = ({ totalSalesMYSFormatted }) => {
  const totalSalesMYS = Number(
    totalSalesMYSFormatted.replace(/\s/g, "").replace(",", ".").replace("€", "")
  );
  return (
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm md:text-xl flex flex-col gap-2 font-medium">
        My Sadaka
        <AnimatedNumber value={Number(totalSalesMYS)} />
      </p>
    </div>
  );
};

export default Mysadaka;
